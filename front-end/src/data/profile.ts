import { GetBucketAclCommandInput } from "@aws-sdk/client-s3";
import { SongData } from "./song";

export interface ProfileData {
    guid: string;
    favouriteSongs: FavouriteSongs;
};

export interface FavouriteSongs {
    first?: SongData;
    second?: SongData;
    third?: SongData;
}
