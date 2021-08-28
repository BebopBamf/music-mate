import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  emoji: string;
}

const UserIcon: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center text-5xl">
      <span>{props.emoji}</span>
    </div>
  );
};

export default UserIcon;
