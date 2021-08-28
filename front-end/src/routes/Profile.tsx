import { FunctionalComponent, render, h } from "preact";
import { useState } from "preact/hooks";
import { ProfileCards, ProfileImage } from "components/Profile";
import { User } from "data/user";
import ProfileTitle from "components/Profile/ProfileTitle";
import { Modal } from "components";

interface Props {
  id?: string;
  isEditable: boolean;
}

const Profile: FunctionalComponent<Props> = ({ id, isEditable }) => {
  const isLoading = false;

  const stubUser: User = {
    guid: "1111111-111111-11111-111",
    name: "Euan Mendoza",
    emoji: "🍆",
    location: {
      locale: "en_AU.UTF-8",
      city: "Sydney",
      country: "Australia",
      emoji: "🇦🇺",
    },
    songs: [
      {
        uri: "",
        title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
        artist: "Bruno Mars",
        explicit: true,
        duration: 190213,
        image:
          "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
      },
      {
        uri: "",
        title: "The Crazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
        artist: "Bruno Mars",
        explicit: true,
        duration: 190213,
        image:
          "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
      },
      {
        uri: "",
        title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
        artist: "Bruno Mars",
        explicit: true,
        duration: 190213,
        image:
          "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
      },
    ],
  };

  const [profileData, setProfileData] = useState(stubUser);

  const { name, emoji, location, songs } = profileData;

  const saveProfile = () => {
    //TODO: SAVE DATA TO SERVER
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="px-4 w-full flex flex-col space-y-6 py-4">
        <ProfileImage
          emoji={profileData.emoji}
          isEditable={isEditable}
          setNewEmoji={(emoji) =>
            setProfileData((currentUserData) => ({
              ...currentUserData,
              emoji: emoji,
            }))
          }
        />
        <ProfileTitle name={name} location={location} isEditable={isEditable} />
        <ProfileCards
          songs={songs}
          setSongs={() => {}}
          isEditable={isEditable}
        />
      </div>
    </div>
  );
};

export default Profile;
