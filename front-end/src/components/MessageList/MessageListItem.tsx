import { ComponentChildren, FunctionalComponent, h } from "preact";
import { UserIcon, Badge } from "components/Common";
import { ChevronRight, MusicNote } from "components/Common/Icons";
import { User, Location } from "data/user";
import { SongData } from "data/song";

export interface Props {
  children?: ComponentChildren;
  user: User
}

interface SongCardProps {
  song: SongData;
}

const SongCard = ({ song }: SongCardProps) => {
  const { title, artist } = song;

  return (
    <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
      <div className="flex items-center justify-center">
        <MusicNote />
      </div>
              
      <div className="flex flex-col truncate">
        <p className="text-md font-semibold text-gray-700 truncate">
          {title}
        </p>
          <p className="text-sm text-gray-500 truncate">{artist}</p>
      </div>

    </div>
  );
};

const MessageListItem: FunctionalComponent<Props> = ({ user }: Props) => {
  const { name, emoji, location, lastPlayed } = user;
  
  const formatLocation = (location: Location) => {
    const { name, emoji } = location;

    return `${name} ${emoji}`;
  };

  const noSong: SongData = {
    uri: '',
    title: 'No Song Found',
    artist: 'No Artist Found',
    explicit: false,
    duration: 0,
    image: '',
  }

  return (
    <a href="#">
      <li className="">
        <div className="flex flex-row py-4 space-x-4 items-center">
          
          <div className="flex-shrink-0 flex flex-col items-center">
            <UserIcon emoji={emoji} />
            <div className="-mt-4">
              <Badge contents="3d" />
            </div>
          </div>

          <div className="flex flex-col flex-1 truncate">
            <h4 className="text-md font-bold text-gray-900 truncate">
              {name} from {formatLocation(location)}
            </h4>

            <SongCard song={lastPlayed ? lastPlayed : noSong } />
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
