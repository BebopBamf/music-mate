import { SongData } from "./song";

export type Guid = string;

export interface User {
  guid: Guid;
  name: string;
  emoji: string;
  location: Location;
  songs: SongData[];
}

export interface ProfileData {
  profileid: Guid;
  emoji: string;
  name: string;
  location: Location;
  songs: SongData[]
}

export interface Location {
  city: string;
  emoji: string;
}
