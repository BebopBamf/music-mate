import { ComponentChildren, FunctionalComponent, render } from "preact";
import { useState } from 'preact/hooks';
import { ProfileTitleBar, ProfileCardsList } from '../components'
import { map } from 'lodash/fp';

interface Props {
  children?: ComponentChildren;
  guid?: string;
}

const Profile: FunctionalComponent<Props> = ({ guid }) => {
  const [profileData, setProfileData] = useState({ guid: '12323123-12323123-12323123-12323123', name: 'Euan Mendoza', emoji: '🍆', location: 'Sydney Australia' });
  const [cardData, setCardData] = useState([]);

  return (
    <div class="px-4 h-screen flex flex-col space-y-4 py-4">
      <ProfileTitleBar profName={profileData.name} emoji={profileData.emoji} location={profileData.location} />

      <div class="items-center">
        <button class="bg-indigo-600 shadow rounded text-white px-4 py-2 sm:p-6">Follow</button>
        <button class="bg-indigo-600 shadow rounded text-white px-4 py-2 sm:p-6">Play Pal</button>
      </div>

      <ProfileCardsList />      

    </div>
  );
};

export default Profile;
