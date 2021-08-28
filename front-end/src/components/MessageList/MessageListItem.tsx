import { ComponentChildren, FunctionalComponent, h } from "preact";
import { UserIcon, Badge } from "components/Common";
import { ChevronRight, MusicNote } from "components/Common/Icons";
import { SongData } from "data/song";

export interface MessageListItemProps {
  children?: ComponentChildren;
  data: SongData
}

const MessageListItem: FunctionalComponent<MessageListItemProps> = ({ data }: MessageListItemProps) => {
  const { name, location, songName, songArtist }: SongData = data;

  return (
    <a href="#">
      <li className="">
        <div className="flex flex-row py-4 space-x-4 items-center">
          <div className="flex-shrink-0 flex flex-col items-center">
            <UserIcon emoji="🍆" />
            <div className="-mt-4">
              <Badge contents="3d" />
            </div>
          </div>
          <div className="flex flex-col flex-1 truncate">
            <h4 className="text-md font-bold text-gray-900 truncate">
              {name} from {location}
            </h4>
            <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
              <div className="flex items-center justify-center">
                <MusicNote />
              </div>
              <div className="flex flex-col truncate">
                <p className="text-md font-semibold text-gray-700 truncate">
                  {songName}
                </p>
                <p className="text-sm text-gray-500 truncate">{songArtist}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ChevronRight />
          </div>
        </div>
      </li>
    </a>
  );
};

export default MessageListItem;
