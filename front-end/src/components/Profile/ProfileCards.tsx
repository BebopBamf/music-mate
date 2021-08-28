import { FunctionalComponent, h } from "preact";
import CardComponent from "./ProfileCard";
import { SongData } from "data/song";
import { props } from "lodash/fp";

interface Props {
  songs: SongData[];
  setSongs: (songs: SongData[]) => void;
  isEditable: boolean;
}

const ProfileCards: FunctionalComponent<Props> = ({
  songs,
  isEditable,
  setSongs,
}: Props) => {
  const handleSetSong = (song: SongData, index: number) => {
    const songData = songs;
    songData[index] = song;
    setSongs(songData);
  };

  return (
    <div className="mx-4">
      <ul role="list" className="space-y-3">
        {songs.map((song, key) => (
          <li
            key={key}
            className="bg-white shadow overflow-hidden rounded-md px-4 py-4"
          >
            <CardComponent
              song={song}
              isEditable={isEditable}
              setSong={(song: SongData) => handleSetSong(song, key)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileCards;
