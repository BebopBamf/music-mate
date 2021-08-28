import dataclasses


@dataclasses.dataclass
class Song:
    uri: str
    title: str
    artist: str
    explicit: bool
    duration: int
    imageUrl: str

    def __init__(
        self,
        uri: str,
        title: str,
        artist: str,
        explicit: bool,
        duration: int,
        imageUrl: str,
    ):
        self.uri = uri
        self.title = title
        self.artist = artist
        self.explicit = explicit
        self.duration = duration
        self.imageUrl = imageUrl
