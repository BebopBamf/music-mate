import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map } from "lodash/fp";
import MessageListItem from "./MessageListItem";
import { User } from "data/user";
import { SongData } from "data/song";

interface Props {
  children?: ComponentChildren;
}

const MessageList: FunctionalComponent<Props> = (props: Props) => {
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

  const fetchUserDataStub = map(_ => stubUser)(Array(10).fill(0));

  const transformSongData = map((data: User) => (<MessageListItem user={data} />));

  const [userData, setUserData] = useState(fetchUserDataStub);

  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      {transformSongData(userData)}
    </ul>
  );
};

export default MessageList;
