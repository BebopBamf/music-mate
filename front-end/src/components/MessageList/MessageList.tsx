import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map } from "lodash/fp";
import MessageListItem from "./MessageListItem";
import useSWR from 'swr';
import { User } from "data/user";
import { SongData } from "data/song";
import { ChatData } from "data/chat";

const APIUrl = 'https://7a9ot7v4s0.execute-api.ap-southeast-2.amazonaws.com/api';

interface Props {
  children?: ComponentChildren;
}

const FailPage = () => (
  <div>
    <h1>Failure!</h1>
  </div>
);

const MessageList: FunctionalComponent<Props> = (props: Props) => {
  const { data, error } = useSWR('/chats');

  const transformSongData = map((data: ChatData) => (<MessageListItem chat={data} />));

  if (error) return <FailPage />;

  if (!data) return <h1>Loading...</h1>

  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      {transformSongData(data)}
    </ul>
  );
};

export default MessageList;
