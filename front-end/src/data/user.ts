import { SongData } from "./song";

export type Guid = string;

export interface User {
  guid: Guid;
  name: string;
  emoji: string;
  location: Location;
  songs: SongData[];
}

export interface Location {
  locale: string;
  city: string;
  country: string;
  emoji: string;
}
