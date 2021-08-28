import os
from backend.runtime.chalicelib.Song import Song
import boto3
from dataclasses import dataclass
import datetime
from chalice import Chalice
from chalice.app import (
    ChaliceViewError,
    CognitoUserPoolAuthorizer,
    NotFoundError,
    Response,
)
import json
import requests


app = Chalice(app_name="backend")

authorizer = CognitoUserPoolAuthorizer(
    "UserPool", provider_arns=[os.environ.get("USER_POOL_ARN", "")]
)

dynamodb = boto3.resource("dynamodb")
dynamodb_table = dynamodb.Table(os.environ.get("APP_TABLE_NAME", ""))


def isLocal(current_request) -> bool:
    headers = current_request.headers
    return not headers["host"].split(":")[0] in ["127.0.0.1", "localhost"]


def get_base_url(current_request):
    headers = current_request.headers
    base_url = "%s://%s" % (headers.get("x-forwarded-proto", "http"), headers["host"])
    if "stage" in current_request.context:
        base_url = "%s/%s" % (base_url, current_request.context.get("stage"))
    if isLocal(current_request):
        base_url = base_url + "/api"
    return base_url


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
@app.route("/profile", methods=["GET"])
def get_my_profile():
    return [
        {
            "profileid": "13db5e8e-e4b8-4590-ac3c-654419dcead5",
            "emoji": "🍎",
            "name": "David",
            "location": {"city": "Sydney", "cityEmoji": "🇦🇺"},
            "following": False,
            "songs": [
                # json.dumps(dataclass.asdict(songA)),
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
                "name": "David",
                "location": "Sydney",
                "location_emoji": "🇦🇺",
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
                "emoji": "🦆",
                "name": "Matthew",
                "location": "Sydney",
                "location_emoji": "🇦🇺",
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


@app.route("/chats/{chatid}", methods=["POST"])
def message_chat_by_id(chatid):
    message = app.current_request.json_body()
    assert all(
        [key in message.keys() for key in ["uri", "type"]]
    ), "Missing required types uri and type"
    return


@app.route("/search", methods=["GET"])
def search_songs():
    query = app.current_request.query_params.get("q")
    assert query != None, "Missing query string"
    page = 0
    return {
        "next": f"{get_base_url(app.current_request)}/search?q={query}&p={page+1}",
        "results": [
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
                "explicit": True,
                "duration": 290213,
                "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
            },
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
                "explicit": True,
                "duration": 290213,
                "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
            },
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
                "explicit": True,
                "duration": 290213,
                "imageUrl": "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
            },
        ],
    }


@app.route("/", methods=["GET"])
def ping():
    return "Hello 🍆"


@app.route("/spotify/connect", methods=["GET"], authorizer=authorizer)
def connect_spotify():
    app.au
    client_id = os.environ.get("SPOTIFY_CLIENT_ID")
    if client_id == None:
        raise ChaliceViewError("No Environment Variable Set")
    authorize_endpoint = "https://accounts.spotify.com/authorize"
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
            "state": f"{user_id}_0",
        },
    )

    return {"auth_url": request.prepare().url}


@app.route("/spotify/redirect", methods=["GET"])
def connect_spotify():
    print(app.current_request.query_params)
    return Response(
        status_code=301,
        body="",
        headers={
            "Location": "https://lucid-wozniak-c166e8.netlify.app/spotify-success"
        },
    )


@app.route("/testauth", methods=["GET"], authorizer=authorizer)
def test_auth():
    pass
