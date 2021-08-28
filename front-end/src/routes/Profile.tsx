import { ComponentChildren, FunctionalComponent, render } from "preact";
import { useState } from "preact/hooks";
import { ProfileTitleBar, ProfileCardsList } from "../components";
import { map } from "lodash/fp";
import { User } from 'data/user';

interface Props {
  children?: ComponentChildren;
  guid?: string;
}

const Profile: FunctionalComponent<Props> = ({ guid }) => {
  const isLoading = false;
  
  const stubUser: User = {
    guid: '1111111-111111-11111-111',
    name: 'Euan Mendoza',
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
      first: {
        uri: '',
        title: 'Untitled',
        artist: "D'Angelo",
        explicit: true,
        duration: 1232,
        image: '',
      },
      second: {
        uri: '',
        title: 'Betray My Heart',
        artist: `D'Angelo`,
        explicit: true,
        duration: 12323,
        image: '',
      },
      third: undefined,
    },
    followingUser: ['123232132'],
  };

  const [profileData, setProfileData] = useState(stubUser);
  const [cardData, setCardData] = useState([]);

  const { name, emoji, location, favouriteSongs } = profileData;

  return (
    <div class="px-4 h-screen flex flex-col space-y-4 py-4">
      <ProfileTitleBar
        profName={name}
        emoji={emoji}
        location={`${location.name} ${location.emoji}`}
      />

      <div class="items-center">
        <button class="bg-indigo-600 shadow rounded text-white px-4 py-2 sm:p-6">
          Follow
        </button>
        <button class="bg-indigo-600 shadow rounded text-white px-4 py-2 sm:p-6">
          Play Pal
        </button>
      </div>

      <ProfileCardsList favouriteSongs={favouriteSongs} />
    </div>
  );
};

export default Profile;
