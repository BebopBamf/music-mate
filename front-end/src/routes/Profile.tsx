import { FunctionalComponent, render, h } from "preact";
import { ProfileCards, ProfileImage } from "components/Profile";
import { User, ProfileData, Guid } from "data/user";
import ProfileTitle from "components/Profile/ProfileTitle";
import useSWR from "swr";
import { Modal } from "components";

interface Props {
  guid?: Guid;
  isEditable: boolean;
}

interface ProfileContentProps {
  user: User;
  isEditable: boolean;
}

const Profile: FunctionalComponent<Props> = ({ guid, isEditable }) => {
  if (!guid) {
    const { data, error } = useSWR(`/profile`);
    
    if (error) return <div>failed to load</div>;

    if (!data)
      return (
        <div className="flex flex-col items-center justify-center h-full animate-pulse">
          <div className="flex flex-col w-full px-4 py-4 space-y-6">
            <div className="flex items-center justify-center w-full">
              <div class="bg-gray-200 font-emoji w-36 h-36 rounded-full shadow-xl"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="block w-1/3 h-8 mb-1 bg-gray-200">d</div>
            <div className="block w-1/2 h-6 bg-gray-200" />
            </div>
            <ul role="list" className="space-y-3">
              <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
                <div className="flex flex-row space-x-4">
                  <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                  <div className="block w-full h-12 bg-gray-200" />
                </div>
              </li>
              <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
                <div className="flex flex-row space-x-4">
                  <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                  <div className="block w-full h-12 bg-gray-200" />
                </div>
              </li>
              <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
                <div className="flex flex-row space-x-4">
                  <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                  <div className="block w-full h-12 bg-gray-200" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      );

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col w-full px-4 py-4 space-y-6">
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
  }
  const { data, error } = useSWR(`/profile/${guid}`);

  const saveProfile = () => {
    //TODO: SAVE DATA TO SERVER
  };

  if (error) return <div>failed to load</div>;

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center h-full animate-pulse">
        <div className="flex flex-col w-full px-4 py-4 space-y-6">
          <div className="flex items-center justify-center w-full">
            <div class="bg-gray-200 font-emoji w-36 h-36 rounded-full shadow-xl"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="block w-1/3 h-8 mb-1 bg-gray-200">d</div>
            <div className="block w-1/2 h-6 bg-gray-200" />
          </div>
          <ul role="list" className="space-y-3">
            <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
              <div className="flex flex-row space-x-4">
                <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                <div className="block w-full h-12 bg-gray-200" />
              </div>
            </li>
            <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
              <div className="flex flex-row space-x-4">
                <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                <div className="block w-full h-12 bg-gray-200" />
              </div>
            </li>
            <li className="px-4 py-4 overflow-hidden bg-white rounded-md shadow">
              <div className="flex flex-row space-x-4">
                <div className="flex-shrink-0 block w-12 h-12 bg-gray-200" />
                <div className="block w-full h-12 bg-gray-200" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col w-full px-4 py-4 space-y-6">
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
