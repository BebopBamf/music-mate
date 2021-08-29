import base64
from chalicelib.Secrets import get_secret
from hashlib import pbkdf2_hmac
import os
import random
from chalicelib.Song import Song
import boto3
from boto3.dynamodb.conditions import Key
from dataclasses import dataclass
import datetime
from chalice import Chalice
from chalice.app import (
    BadRequestError,
    CORSConfig,
    ChaliceViewError,
    CognitoUserPoolAuthorizer,
    NotFoundError,
    Response,
    UnauthorizedError,
)
from urllib.parse import unquote
import json
import requests


app = Chalice(app_name="backend")

app.api.cors = True


authorizer = CognitoUserPoolAuthorizer(
    "UserPool", provider_arns=[os.environ.get("USER_POOL_ARN", "")]
)


def _init_dynamo_resource() -> boto3.resource:
    dynamodb = boto3.resource("dynamodb")
    return dynamodb.Table("backend-ProfileTable0598D89D-QO29GIR1GL9O")


def _get_phone_number(current_request):
    print(":)")
    if isLocal(current_request):
        return "+61411031923"
    else:
        return app.current_request.context["authorizer"]["claims"]["phone_number"]


def _my_profile_id(current_request):
    phone_number = _get_phone_number(current_request)
    profile_id = _init_dynamo_resource().query(
        IndexName="inverted-index",
        KeyConditionExpression=Key("SK").eq(f"COGNITO_{phone_number}"),
        ProjectionExpression="PK",
    )["Items"][0]["PK"]
    return profile_id


def isLocal(current_request) -> bool:
    headers = current_request.headers
    return headers["host"].split(":")[0] in ["127.0.0.1", "localhost"]


def get_base_url(current_request):
    headers = current_request.headers
    base_url = "%s://%s" % (headers.get("x-forwarded-proto", "http"), headers["host"])
    if "stage" in current_request.context:
        base_url = "%s/%s" % (base_url, current_request.context.get("stage"))
    return base_url


def _parse_track(track):
    return {
        "uri": track["uri"],
        "name": track["name"],
        "artist": track["artists"][0]["name"],
        "explicit": track["explicit"],
        "duration": 1000 * track["duration_ms"],
        "imageUrl": track["album"]["images"][-1]["url"],
    }


# _____matt's usage_______
# const song = {
# uri
#     title: "The Lazy song",
#     artist: "Bruno Mars",
#     explicit: true,
#     duration: 190213,
#     imageUrl:
#       "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
#   };

songA = Song(
    "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
    "When I needed you",
    "Carly Rae Jepsen",
    True,
    290213,
    "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
)
songJ = {
    "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
    "title": "When I needed you",
    "artist": "Carly Rae Jepsen",
    "explicit": True,
    "duration": 290213,
    "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
}

# TODO: change songs to messgaes, stub data for stuff, types for songs?
@app.route("/profile", methods=["GET"], authorizer=authorizer)
def get_my_profile():
    profile_id = _my_profile_id(app.current_request)
    meta = _init_dynamo_resource().query(
        KeyConditionExpression=Key("PK").eq(profile_id) & Key("SK").eq("META")
    )["Items"]
    if len(meta) > 0:
        meta = meta[-1]
    else:
        meta = {}
    location = meta.get("location", {"city": "Somewhere", "cityEmoji": "🌎"})
    songs = _init_dynamo_resource().query(
        KeyConditionExpression=Key("PK").eq(profile_id) & Key("SK").begins_with("SONG_")
    )["Items"]
    profile = [
        {
            "profileid": profile_id.split("_")[-1],
            "emoji": meta.get("emoji", "☺️"),
            "name": meta.get("name", "Username"),
            "location": location,
            "following": False,
            "songs": [
                {key: value for key, value in song.items() if key not in ["PK", "SK"]}
                for song in songs
            ],
        }
    ]
    print(profile)
    return profile


@app.route("/profile/{id}", methods=["GET"])
def get_profile_by_id(id):
    return [
        {
            "profileid": "13db5e8e-e4b8-4590-ac3c-654419dcead5",
            "emoji": "🍎",
            "name": "David",
            "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            "following": False,
            "songs": [
                {
                    "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                    "title": "When I needed you",
                    "artist": "Carly Rae Jepsen",
                    "explicit": True,
                    "duration": 290213,
                    "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                },
                {
                    "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                    "title": "The Lazy song",
                    "artist": "Bruno Mars",
                    "explicit": True,
                    "duration": 190213,
                    "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                },
            ],
        }
    ]


@app.route("/profile/{id}/follow", methods=["POST"])
def follow_profile_by_id(id):
    # do stuff
    pass


def _get_songs_info(trackids, apikey):
    cached_tracks = []
    cached_tracks_uris = []
    stale_tracks = []
    for uri in trackids:
        assert type(uri) == str
        assert len(uri.split(":")) == 3
        _, uri_type, trackid = uri.split(":")[:3]
        assert uri_type == "track"
        song_query = _init_dynamo_resource().query(
            IndexName="inverted-index",
            KeyConditionExpression=Key("SK").eq(f"TRACK_{trackid}"),
            Limit=1,
        )
        if song_query["Count"] == 1:
            cached_tracks_uris.append(uri)
            cached_tracks.append(
                {
                    key: value
                    for key, value in song_query["Items"][0].keys()
                    if not key in ["PK", "SK"]
                }
            )
    res = requests.get(
        "https://api.spotify.com/v1/tracks",
        params={
            "ids": ",".join(
                [
                    track.split(":")[-1]
                    for track in trackids
                    if not track in cached_tracks
                ]
            )
        },
        headers={"Authorization": f"Bearer {apikey}"},
    ).json()
    return [_parse_track(track) for track in res["tracks"]] + cached_tracks


@app.route("/profile/songs", methods=["PUT"], authorizer=authorizer)
def add_song_to_profile():
    """
    body - {
        uris: str[] // A list of song URIs
    }
    """
    profile_id = _my_profile_id(app.current_request)
    body = app.current_request.json_body
    songs = _get_songs_info(body["uris"], _get_spotify_api_key(profile_id))
    with _init_dynamo_resource().batch_writer() as batch:
        for song in songs:
            batch.put_item(
                Item={
                    "PK": profile_id,
                    "SK": f"SONG_{song['uri'].split(':')[-1]}",
                    **song,
                }
            )
    return Response({"songs": songs}, status_code=200)


@app.route("/profile", methods=["PUT"], authorizer=authorizer)
def update_profile():
    """
    PUT /profile
    body - {
        updates: {
            emoji?: str,
            name?: str,
            location?: {
                {
                    city: str,
                    cityEmoji: str
                }
            }
        }
    }
    """
    profile_id = _my_profile_id(app.current_request)
    body = app.current_request.json_body
    updates = body["updates"]
    assert type(updates) == dict
    assert all([key in ["emoji", "name", "location"] for key in updates.keys()])
    if any([key == "location" for key in updates.keys()]):
        assert len(updates["location"].keys()) == 2
        assert all([key in ["city", "cityEmoji"] for key in updates["location"].keys()])
    expressions = []
    for index, key in enumerate(updates.keys()):
        if key == "name":
            expressions.append(f"#resvN = :val{index}")
        elif key == "location":
            expressions.append(f"#resvL = :val{index}")
        else:
            expressions.append(f"{key} = :val{index}")
    names = {}
    for index, key in enumerate(updates.keys()):
        if key == "name":
            names = {**names, "#resvN": "name"}
        if key == "location":
            names = {**names, "#resvL": "location"}
    print(expressions, names)
    update = _init_dynamo_resource().update_item(
        Key={"PK": profile_id, "SK": "META"},
        UpdateExpression="SET " + ", ".join(expressions),
        ExpressionAttributeValues={
            f":val{index}": updates[key] for index, key in enumerate(updates.keys())
        },
        ExpressionAttributeNames=names,
        ReturnValues="ALL_NEW",
    )
    return {
        key: value
        for key, value in update["Attributes"].items()
        if key not in ["PK", "SK"]
    }


@app.route("/profile/recent", methods=["GET"])
def get_my_recent_songs():
    return [
        {
            "song": {
                "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                "title": "The Lazy song",
                "artist": "Bruno Mars",
                "explicit": True,
                "duration": 190213,
                "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
            }
        }
    ]


# Song(uri, ...).toJson()


@app.route("/chats", methods=["GET"])
def list_chats():
    return [
        {
            "chatid": "6c36240b-42b2-4798-aede-fdcff63d34a6",
            "emoji": "🍎",
            "name": "David",
            "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            "lastTrack": {
                "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                "title": "When I needed you",
                "artist": "Carly Rae Jepsen",
            },
        },
        {
            "chatid": "ae5f424f-bacd-4824-b30b-f4e3eda7822a",
            "emoji": "🦆",
            "name": "Matthew",
            "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            "lastTrack": {
                "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                "title": "The Lazy song",
                "artist": "Bruno Mars",
                "explicit": True,
                "duration": 190213,
                "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
            },
        },
    ]


@app.route("/chats/{chatid}", methods=["GET"])
def get_chat_by_id(chatid):
    if chatid == "6c36240b-42b2-4798-aede-fdcff63d34a6":
        return {
            "recipient": {
                "emoji": "🍎",
                "id": "13db5e8e-e4b8-4590-ac3c-654419dcead5",
                "name": "David",
                "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            },
            "messages": [
                {
                    "recipient": False,
                    "sent": datetime.datetime(2021, 8, 29, 22, 0).isoformat(),
                    "type": "basic",
                    "song": {
                        "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                        "title": "The Lazy song",
                        "artist": "Bruno Mars",
                        "explicit": True,
                        "duration": 190213,
                        "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                    },
                },
                {
                    "recipient": True,
                    "sent": datetime.datetime(2021, 8, 29, 22, 30).isoformat(),
                    "type": "emoji",
                    "emoji": "❤️",
                    "song": {
                        "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                        "title": "When I needed you",
                        "artist": "Carly Rae Jepsen",
                        "explicit": True,
                        "duration": 290213,
                        "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                    },
                },
            ],
        }
    elif chatid == "ae5f424f-bacd-4824-b30b-f4e3eda7822a":
        return {
            "recipient": {
                "id": "13db5e8e-e4b8-4590-ac3c-654419dcead5",
                "emoji": "🦆",
                "name": "Matthew",
                "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            },
            "messages": [
                {
                    "recipient": True,
                    "sent": datetime.datetime(2021, 8, 29, 21, 30).isoformat(),
                    "type": "emoji",
                    "emoji": "🍆",
                    "song": {
                        "uri": "spotify:track:70Vdd1gx5tn84jkAU31ASv",
                        "title": "Sexy and I Know It",
                        "artist": "LMFAO",
                        "explicit": True,
                        "duration": 290213,
                        "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                    },
                },
                {
                    "recipient": False,
                    "sent": datetime.datetime(2021, 8, 29, 22, 0).isoformat(),
                    "type": "basic",
                    "song": {
                        "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                        "title": "When I needed you",
                        "artist": "Carly Rae Jepsen",
                        "explicit": True,
                        "duration": 290213,
                        "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
                    },
                },
            ],
        }
    else:
        raise NotFoundError("Could not find chat with associated ID")


@app.route("/search", methods=["GET"])
def search_songs():
    key = _get_spotify_api_key(_my_profile_id(app.current_request))
    query = app.current_request.query_params.get("q")
    assert query != None, "Missing query string"
    page = int(app.current_request.query_params.get("page", 0))
    res = requests.get(
        "https://api.spotify.com/v1/search",
        params={"q": query, "type": "track", "limit": 20},
        headers={"Authorization": f"Bearer {key}"},
    ).json()
    return {
        "next": f"{get_base_url(app.current_request)}/search?q={query}&p={page+1}&offset={page}",
        "results": [_parse_track(track) for track in res["tracks"]["items"]],
    }


@app.route("/", methods=["GET"])
def ping():
    return "Hello 🍆"


def _get_spotify_api_key(profile_id):
    key_query = _init_dynamo_resource().query(
        KeyConditionExpression=Key("PK").eq(profile_id)
        & Key("SK").begins_with("SPOTIFYKEY_UNTIL_"),
        ScanIndexForward=False,
        Limit=1,
    )
    assert key_query["Count"] == 1
    expiry = datetime.datetime.fromisoformat(key_query["Items"][0]["SK"].split("_")[-1])
    print(expiry)
    print(datetime.datetime.now())
    if datetime.datetime.now() > expiry:
        res = requests.post(
            "https://accounts.spotify.com/api/token",
            data={
                "grant_type": "refresh_token",
                "refresh_token": key_query["Items"][0]["refresh_token"],
                "client_id": "bebb2a733b624a089d75b4a3d2240112",
                "client_secret": get_secret(),
            },
        )
        body = res.json()
        print(body)
        res.raise_for_status()
        _init_dynamo_resource().put_item(
            Item={
                "PK": profile_id,
                "SK": f"SPOTIFYKEY_UNTIL_{(datetime.datetime.now()+datetime.timedelta(seconds=body['expires_in'])).isoformat()}",
                **body,
            }
        )
        return body["access_token"]
    else:
        return key_query["Items"][0]["access_token"]


@app.route("/spotify/connect", methods=["GET"], authorizer=authorizer)
def connect_spotify():
    profile_id = _my_profile_id(app.current_request)
    state = "SPOTIFYSTATE_" + "".join(
        [BASE62[random.randint(0, len(BASE62) - 1)] for i in range(16)]
    )
    _init_dynamo_resource().put_item(
        Item={
            "PK": profile_id,
            "SK": state,
            "createdAt": datetime.datetime.now().isoformat(),
        }
    )
    client_id = os.environ.get("SPOTIFY_CLIENT_ID")
    if client_id == None:
        raise ChaliceViewError("No Environment Variable Set")
    authorize_endpoint = "https://accounts.spotify.com/authorize"
    print(get_base_url(app.current_request) + "/spotify/redirect")
    request = requests.Request(
        url=authorize_endpoint,
        params={
            "client_id": client_id,
            "response_type": "code",
            "redirect_uri": get_base_url(app.current_request) + "/spotify/redirect",
            "show_dialog": isLocal(app.current_request),
            "scopes": [
                "user-read-recently-played",
                "user-top-read",
                "playlist-modify-public",
                "playlist-modify-private",
                "playlist-read-private",
                "playlist-read-collaborative",
            ],
            "state": state,
        },
    )

    return {"auth_url": request.prepare().url}


@app.route("/spotify/redirect", methods=["GET"])
def connect_spotify():
    params = app.current_request.query_params
    profile_id_query = _init_dynamo_resource().query(
        IndexName="inverted-index",
        KeyConditionExpression=Key("SK").eq(unquote(params.get("state"))),
        ProjectionExpression="PK",
    )
    if profile_id_query["Count"] < 1:
        raise UnauthorizedError("State not valid")
    if params.get("code"):
        profile_id = profile_id_query["Items"][0]["PK"]
        res = requests.post(
            "https://accounts.spotify.com/api/token",
            data={
                "grant_type": "authorization_code",
                "code": params.get("code"),
                "redirect_uri": get_base_url(app.current_request) + "/spotify/redirect",
                "client_id": "bebb2a733b624a089d75b4a3d2240112",
                "client_secret": get_secret(),
            },
        )
        body = res.json()
        _init_dynamo_resource().put_item(
            Item={
                "PK": profile_id,
                "SK": f"SPOTIFYKEY_UNTIL_{(datetime.datetime.now()+datetime.timedelta(seconds=body['expires_in'])).isoformat()}",
                **body,
            }
        )
        return Response(
            status_code=301,
            body="",
            headers={"Location": "http://127.0.0.1:8080/profile"},
        )
    else:
        raise BadRequestError("No code :(")


BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"


@app.route("/create_profile", methods=["PUT"], authorizer=authorizer)
def create_profile():
    user_phone = _get_phone_number(app.current_request)
    pk = "PROFILE_" + "".join(
        [BASE62[random.randint(0, len(BASE62) - 1)] for i in range(10)]
    )
    sk = "COGNITO_" + user_phone
    body = {"createdDate": datetime.datetime.now().isoformat()}
    _init_dynamo_resource().put_item(Item={"PK": pk, "SK": sk, **body})


@app.route("/me", methods=["GET"], authorizer=authorizer)
def get_me():
    return {"profile_id": _my_profile_id(app.current_request)}
