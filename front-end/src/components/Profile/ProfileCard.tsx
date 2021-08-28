import { FunctionalComponent, h } from "preact";
import { SongData } from "data/song";
import { formatTime } from "components/Common/Helpers";
import { Edit, Explicit } from "components/Common/Icons";
import { SongPicker } from "components/SongPicker";
import { useState } from "preact/hooks";

interface Props {
  song: SongData;
  isEditable: boolean;
  setSong: (song: SongData) => void;
}

const ProfileCard: FunctionalComponent<Props> = ({
  song,
  isEditable,
  setSong,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="flex flex-row space-x-4"
      onClick={() => {
        setIsOpen(isEditable);
      }}
    >
      <div className="h-12 w-12">
        <img src={song.image} className="h-12 w-12" />
      </div>
      <div className="flex-1 flex flex-col truncate">
        <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0 ">
          <div className="truncate flex-1 font-bold">{song.title}</div>
          <div className="truncate flex-shrink-0">
            {formatTime(song.duration)}
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0">
          <div className="truncate flex-1">{song.artist}</div>
          <Explicit />
        </div>
      </div>
      <div
        className={`${
          isEditable ? "flex items-center justify-center" : "hidden"
        }`}
      >
        <Edit />
      </div>
      <SongPicker
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedSong={(song: SongData) => setSong(song)}
      />
    </div>
  );
};

export default ProfileCard;
