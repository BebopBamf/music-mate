import { FunctionalComponent, h } from "preact";
import { Explicit } from "components/Common/Icons";

interface Props {
  isSender: boolean;
}

const MessageItemSong: FunctionalComponent<Props> = (props: Props) => {
  const song = {
    title: "The Lazy song",
    artist: "Bruno Mars",
    explicit: true,
    duration: 190213,
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
  };

  const formatTimeStamp = (s: number) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return (
      (hrs > 0 ? `${hrs}h ` : "") +
      (mins > 0 ? `${mins}m ` : "") +
      (secs > 0 ? `${secs}s ` : "")
    );
  };

  return (
    <li
      className={`${
        props.isSender ? "flex-row-reverse ml-auto" : "flex-row"
      } flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center`}
    >
      <div className="h-16 w-16">
        <img src={song.imageUrl} />
      </div>
      <div
        className={`${
          props.isSender ? "text-right pr-4" : "pl-4"
        } flex-1 flex flex-col truncate`}
      >
        <div className="truncate flex-shrink-0 font-bold">{song.title}</div>
        <div className="truncate flex-shrink-0">{song.artist}</div>
        <div
          className={`${
            props.isSender ? "flex-row-reverse" : "flex-row"
          } flex items-center truncate flex-shrink-0`}
        >
          <div className={`${props.isSender ? "ml-2" : "mr-2"} truncate`}>
            {formatTimeStamp(song.duration)}
          </div>
          <Explicit />
        </div>
      </div>
      <div
        className={`${
          props.isSender ? "mr-4" : "ml-4"
        } flex-shrink-0 flex items-center justify-center h-full font-mono text-4xl`}
      >
        🥺
      </div>
    </li>
  );
};

export default MessageItemSong;
