import os
import boto3
import datetime
from chalice import Chalice
from chalice.app import CognitoUserPoolAuthorizer, NotFoundError


app = Chalice(app_name="backend")

authorizer = CognitoUserPoolAuthorizer(
    "UserPool", provider_arns=[os.environ.get("USER_POOL_ARN", "")]
)

dynamodb = boto3.resource("dynamodb")
dynamodb_table = dynamodb.Table(os.environ.get("APP_TABLE_NAME", ""))


def get_base_url(current_request):
    headers = current_request.headers
    base_url = "%s://%s" % (headers.get("x-forwarded-proto", "http"), headers["host"])
    if "stage" in current_request.context:
        base_url = "%s/%s" % (base_url, current_request.context.get("stage"))
    return base_url


@app.route("/chats", methods=["GET"])
def list_chats():
    return [
        {
            "chatid": "6c36240b-42b2-4798-aede-fdcff63d34a6",
            "emoji": "🍎",
            "name": "David",
            "lastTrack": {
                "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                "name": "When I needed you",
                "artist": "Carly Rae Jepsen",
            },
        },
        {
            "chatid": "ae5f424f-bacd-4824-b30b-f4e3eda7822a",
            "emoji": "🦆",
            "name": "Matthew",
            "lastTrack": {
                "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                "name": "The Lazy Song",
                "artist": "Bruno Mars",
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
            "songs": [
                {
                    "recipient": False,
                    "sent": datetime.datetime(2021, 8, 29, 22, 0).isoformat(),
                    "type": "basic",
                    "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                    "name": "The Lazy Song",
                    "artist": "Bruno Mars",
                },
                {
                    "recipient": True,
                    "sent": datetime.datetime(2021, 8, 29, 22, 30).isoformat(),
                    "type": "emoji",
                    "emoji": "❤️",
                    "uri": "spotify:track:3dDTVzIF6s7EyU6NoviFwD",
                    "name": "When I needed you",
                    "artist": "Carly Rae Jepsen",
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
            "songs": [
                {
                    "recipient": True,
                    "sent": datetime.datetime(2021, 8, 29, 21, 30).isoformat(),
                    "type": "emoji",
                    "emoji": "🍆",
                    "uri": "spotify:track:70Vdd1gx5tn84jkAU31ASv",
                    "name": "Sexy and I Know It",
                    "artist": "LMFAO",
                },
                {
                    "recipient": False,
                    "sent": datetime.datetime(2021, 8, 29, 22, 0).isoformat(),
                    "type": "basic",
                    "uri": "spotify:track:1ExfPZEiahqhLyajhybFeS",
                    "name": "The Lazy Song",
                    "artist": "Bruno Mars",
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
        "next": f"{get_base_url(app.current_request)}/api/search?q={query}&p={page+1}",
        "results": [
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
            },
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
            },
            {
                "uri": "spotify:track:4fK6E2UywZTJIa5kWnCD6x",
                "name": "Friday",
                "artist": "Rebecca Black",
            },
        ],
    }


@app.route("/", methods=["GET"])
def ping():
    return "Hello 🍆"


@app.route("/users/{username}", methods=["GET"])
def get_user(username):
    key = {
        "PK": "User#%s" % username,
        "SK": "Profile#%s" % username,
    }
    item = dynamodb_table.get_item(Key=key)["Item"]
    del item["PK"]
    del item["SK"]
    return item
