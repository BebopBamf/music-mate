import { SongData } from "./song";

export type Guid = string;

export interface ProfileData {
    guid: Guid;
    favouriteSongs: FavouriteSongs;
};

export interface User {
    guid: Guid;
    name: string;
    emoji: string;
    location: Location,
    lastPlayed?: SongData;
    favouriteSongs: FavouriteSongs;
    followingUser: [Guid]
}

export interface Location {
    locale: string;
    name: string;
    emoji: string;
}

export interface FavouriteSongs {
    first?: SongData;
    second?: SongData;
    third?: SongData;
}
