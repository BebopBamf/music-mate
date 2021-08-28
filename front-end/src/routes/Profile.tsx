import { FunctionalComponent, render, h } from "preact";
import { useState } from "preact/hooks";
import useSWR from "swr";
import { ProfileCards, ProfileImage } from "../components/Profile";
import { User, ProfileData, Guid } from "data/user";
import ProfileTitle from "components/Profile/ProfileTitle";

interface Props {
  guid?: Guid;
  isEditable: boolean;
}

interface ProfileContentProps {
  user: ProfileData;
  isEditable: boolean;
}


const ProfileContent: FunctionalComponent<ProfileContentProps> = ({ isEditable, user}) => {
  const [profileData, setProfileData] = useState(user);
  
  const { name, emoji, location, songs } = profileData;
 
  const saveProfile = () => {
    //TODO: SAVE DATA TO SERVER
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="px-4 w-full flex flex-col space-y-8 py-4">
        <ProfileImage
          emoji={emoji}
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
}

const Profile: FunctionalComponent<Props> = ({ guid, isEditable }) => {
  if (guid) {
    const { data, error } = useSWR(`/profile/${guid}`);

    if (error) return <h1>Failure!</h1>;

    if (!data) return <h1>Loading...</h1>;

    return <ProfileContent isEditable={false} user={data} />
  }
  
  const stubUser: ProfileData = {
    profileid: "1111111-111111-11111-111",
    name: "Euan Mendoza",
    emoji: "🍆",
    location: {
      city: "Sydney",
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

  
  return <ProfileContent isEditable={true} user={stubUser} />
};

export default Profile;
