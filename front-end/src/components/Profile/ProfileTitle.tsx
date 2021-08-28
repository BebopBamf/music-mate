import { FunctionalComponent, h } from "preact";
import { Location } from "data/user";
import { Edit } from "components/Common/Icons";

interface Props {
  name: string;
  location: Location;
  isEditable: boolean;
}

const ProfileTitle: FunctionalComponent<Props> = ({
  name,
  location,
  isEditable,
}: Props) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{name}</div>
      <div>
        {location.city}, {location.country} {location.emoji}
      </div>
      <div
        className={`${
          isEditable ? "flex items-center justify-center" : "hidden"
        }`}
      >
        <Edit />
      </div>
    </div>
  );
};

export default ProfileTitle;
