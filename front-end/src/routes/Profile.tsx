import { FunctionalComponent, render, h } from "preact";
import { useState } from "preact/hooks";
import { ProfileCards, ProfileImage } from "components/Profile";
import { User, Guid } from "data/user";
import ProfileTitle from "components/Profile/ProfileTitle";
import useSWR from "swr";
import { Modal } from "components";

interface Props {
  guid?: Guid;
  isEditable: boolean;
}

const Profile: FunctionalComponent<Props> = ({ guid, isEditable }) => {
  const isLoading = false;
  guid = "13db5e8e-e4b8-4590-ac3c-654419dcead5";

  const { data, error } = useSWR("/profile/" + guid);

  const saveProfile = () => {
    //TODO: SAVE DATA TO SERVER
  };

  if (error) return <div>failed to load</div>;

  if (!data)
    return (
      <div className="animate-pulse flex flex-col h-full items-center justify-center">
        <div className="px-4 w-full flex flex-col space-y-6 py-4">
          <div className="w-full flex items-center justify-center">
            <div class="bg-gray-200 font-emoji w-36 h-36 rounded-full shadow-xl"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 w-1/3 h-8 block mb-1">d</div>
            <div className="bg-gray-200 w-1/2 h-6 block" />
          </div>
          <ul role="list" className="space-y-3">
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-4">
              <div className="flex flex-row space-x-4">
                <div className="h-12 w-12 block bg-gray-200 flex-shrink-0" />
                <div className="h-12 w-full block bg-gray-200" />
              </div>
            </li>
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-4">
              <div className="flex flex-row space-x-4">
                <div className="h-12 w-12 block bg-gray-200 flex-shrink-0" />
                <div className="h-12 w-full block bg-gray-200" />
              </div>
            </li>
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-4">
              <div className="flex flex-row space-x-4">
                <div className="h-12 w-12 block bg-gray-200 flex-shrink-0" />
                <div className="h-12 w-full block bg-gray-200" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="px-4 w-full flex flex-col space-y-6 py-4">
        <ProfileImage
          emoji={data.emoji}
          isEditable={isEditable}
          setNewEmoji={() => {}}
        />
        <ProfileTitle
          name={data[0].name}
          location={data[0].location}
          isEditable={isEditable}
        />
        <ProfileCards
          songs={data[0].songs}
          setSongs={() => {}}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

export default Profile;
