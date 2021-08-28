import { formatTime } from "components/Common/Helpers";
import { Close, Explicit } from "components/Common/Icons";
import SlideUp from "components/Common/SlideUp/SlideUp";
import { FunctionalComponent, h, RefCallback } from "preact";
import { emojis } from "components/Common/Helpers";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentSelection?: string;
  setCurrentSelection: (emoji: string) => void;
}
const EmojiPicker: FunctionalComponent<Props> = (props: Props) => {
  const selectedEmoji = props.currentSelection ? props.currentSelection : "🎵";

  return (
    <SlideUp isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <div className="w-full flex flex-col pt-6 bg-gray-100 shadow-2xl rounded-t-2xl">
        <div className="flex flex-row space-x-2 px-4 mb-6 items-center">
          <h1 className="flex-1 text-2xl font-semibold">Pick an Emoji</h1>
          <div className="flex-shrink-0 h-12 w-12">
            <button
              type="button"
              className="h-full w-full flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => props.setIsOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <Close />
            </button>
          </div>
        </div>
        <div class="overflow-y-scroll bg-gray-50 flex-1 pb-4">
          <div className="grid grid-cols-6 gap-4 px-4 py-4 font-emoji">
            {emojis.map((emoji: string) => (
              <a
                href="#"
                onClick={() => {
                  props.setCurrentSelection(emoji);
                  props.setIsOpen(false);
                }}
              >
                <div
                  className={`${
                    emoji == selectedEmoji
                      ? "bg-gray-200 border-4 border-gray-300"
                      : ""
                  } text-4xl flex justify-center items-center bg-gray-100 rounded-full h-14 w-14`}
                >
                  {emoji}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SlideUp>
  );
};

export default EmojiPicker;
