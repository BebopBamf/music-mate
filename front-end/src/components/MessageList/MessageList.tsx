import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map } from "lodash/fp";
import MessageListItem, { MessageListItemProps } from "./MessageListItem";
import { } from "data/user";
import { SongData } from "data/song";

interface Props {
  children?: ComponentChildren;
}

const MessageList: FunctionalComponent<Props> = (props: Props) => {
  const fetchSongDataStub = map(_ => ({ name: "Matt", location: "Sydney", songName: "The Lazy Song", songArtist: "Bruno Mars" }))(Array(10).fill(0));

  const transformSongData = map((data: SongData) => (<MessageListItem data={data} />));

  const [songDatas, setSongDatas] = useState(fetchSongDataStub);

  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      {transformSongData(songDatas)}
    </ul>
  );
};

export default MessageList;
