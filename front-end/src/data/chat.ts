import { Guid } from 'data/user';
import { SongData } from './song';

export interface ChatData {
    chatid: Guid;
    name: string;
    emoji: string;
    lastTrack: SongData;
}

