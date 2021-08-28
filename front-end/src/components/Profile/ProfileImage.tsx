import { Edit } from "components/Common/Icons";
import { EmojiPicker } from "components/EmojiPicker";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

interface Props {
  emoji: string;
  isEditable: boolean;
  setNewEmoji: (emoji: string) => void;
}

const ProfileImage: FunctionalComponent<Props> = ({
  emoji,
  isEditable,
  setNewEmoji,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex items-center justify-center relative">
      <div class="bg-white font-emoji w-36 h-36 rounded-full border-4 border-gray-200 flex items-center justify-center shadow-xl">
        <span className="text-7xl">{emoji}</span>
      </div>
      <div
        className={`${
          isEditable
            ? "absolute -bottom-2 h-8 w-8 bg-gray-200 flex items-center justify-center rounded-full"
            : "hidden"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <Edit />
      </div>
      <EmojiPicker
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentSelection={emoji}
        setCurrentSelection={setNewEmoji}
      />
    </div>
  );
};

export default ProfileImage;
