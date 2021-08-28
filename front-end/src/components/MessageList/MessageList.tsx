import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import * as fp from "lodash/fp";
import MessageListItem, {
  SongData,
  MessageListItemProps,
} from "./MessageListItem";

interface Props {
  children?: ComponentChildren;
}

const MessageList: FunctionalComponent<Props> = (props: Props) => {
  const fetchSongDataStub = () => {
    return fp.map((_x) => {
      return {
        name: "Matt",
        location: "Sydney",
        songName: "The Lazy Song",
        songArtist: "Bruno Mars",
      };
    })(Array(10).fill(0));
  };

  const transformSongData = fp.map((data: SongData) => (
    <MessageListItem data={data} />
  ));

  const [songDatas, setSongDatas] = useState(fetchSongDataStub);
  console.log(songDatas);

  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      {transformSongData(songDatas)}
    </ul>
  );
};

export default MessageList;
