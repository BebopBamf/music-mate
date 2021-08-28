from typing import Any, List
import boto3
from boto3.dynamodb.conditions import Key
import os


class User:
    userID: str
    displayName: str
    emoji: str
    location: str

    def __init__(self, userID) -> None:
        self.userID = userID

    def _init_dynamo_client() -> boto3.resource:
        dynamodb = boto3.resource("dynamodb")
        return dynamodb.Table(os.environ.get("APP_TABLE_NAME", ""))

    def get_songs(self) -> List[str]:
        resource = self._init_dynamo_client()
        resource.query(
            KeyConditionExpression=Key("PK").eq(self.userID)
            & Key("SK").begins_with("SONG_")
        )
