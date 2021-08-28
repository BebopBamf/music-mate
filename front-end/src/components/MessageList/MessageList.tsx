import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map } from "lodash/fp";
import MessageListItem from "./MessageListItem";
import useSWR from 'swr';
import { User } from "data/user";
import { SongData } from "data/song";
import { ChatData } from "data/chat";

const APIUrl = 'https://7a9ot7v4s0.execute-api.ap-southeast-2.amazonaws.com/api';

export const getData = (path: string) => {
    return fetch(APIUrl + path)
        .then(res => res.json())
};
interface Props {
  children?: ComponentChildren;
}

const FailPage = () => (
  <div>
    <h1>Failure!</h1>
  </div>
);

const MessageList: FunctionalComponent<Props> = (props: Props) => {
  const { data, error } = useSWR('/chats', getData);

    /*
  const stubUser: User = {
    guid: '1111111-111111-11111-111',
    name: 'Matt',
    emoji: '🍆',
    location: {
      locale: 'en_AU.UTF-8',
      name: 'Sydney, Australia',
      emoji: '🇦🇺'
    },
    lastPlayed: {
      uri: '',
      title: 'The Lazy Song',
      artist: 'Bruno Mars',
      explicit: false,
      duration: 10323,
      image: ''
    },
    favouriteSongs: {
      first: undefined,
      second: undefined,
      third: undefined,
    },
    followingUser: ['123232132'],
  };
  */

  // const fetchUserDataStub = map(_ => stubUser)(Array(10).fill(0));

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
