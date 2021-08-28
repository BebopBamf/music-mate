import { formatTime } from "components/Common/Helpers";
import { Explicit } from "components/Common/Icons";
import { SongData } from "data/song";
import { FunctionalComponent, h } from "preact";

interface Props {
  song: SongData;
  key: number;
  onClick: (song: SongData) => void;
}

const SongPickerResult: FunctionalComponent<Props> = ({
  song,
  key,
  onClick,
}: Props) => {
  return (
    <li
      key={key}
      className="shadow overflow-hidden rounded-md px-4 py-4 h-20 bg-white flex flex-row"
      onClick={() => {
        onClick(song);
      }}
    >
      <div className="h-12 w-12">
        <img src={song.image} className="h-12 w-12" />
      </div>
      <div className="pl-4 flex-1 flex flex-col truncate">
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
    </li>
  );
};

export default SongPickerResult;
