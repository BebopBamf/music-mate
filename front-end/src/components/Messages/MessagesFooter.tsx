import { Edit } from "components/Common/Icons";
import Send from "components/Common/Icons/Send";
import { MessageData } from "data/message";
import { SongData } from "data/song";
import { ComponentChildren, Fragment, FunctionalComponent, h } from "preact";

interface Props {
  messageData: MessageData;
  toggleEmojiPicker: () => void;
  toggleSongPicker: () => void;
  handleSendMessage: (messageData: MessageData) => void;
}

const MessagesFooter: FunctionalComponent<Props> = ({
  messageData,
  toggleEmojiPicker,
  toggleSongPicker,
  handleSendMessage,
}: Props) => {
  return (
    <div className="flex-shrink-0">
      <div className="h-20 rounded-t-2xl flex flex-row bg-gray-50">
        <div className="flex-shrink-1 h-full rounded-tl-2xl bg-white">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 shadow-sm font-emoji text-4xl h-20 w-20"
            onClick={toggleEmojiPicker}
          >
            {messageData.emoji}
          </button>
        </div>
        <div className="flex-1 h-full truncate">
          <button
            type="button"
            className="bg-gray-100 items-center px-4 py-2 shadow-sm w-full h-full truncate"
            onClick={toggleSongPicker}
          >
            <div className="flex flex-col text-left truncate ">
              <p className="text-md font-semibold text-gray-700 truncate">
                {messageData.song != undefined
                  ? messageData.song.title
                  : "Search for a song..."}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {messageData.song != undefined ? messageData.song.artist : ""}
              </p>
            </div>
          </button>
        </div>
        <div className="flex-shrink-1 h-full">
          <button
            type="button"
            disabled={messageData.emoji != "" && messageData.song?.uri != ""}
            className="h-20 w-32 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-tr-2xl text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            onClick={() => handleSendMessage(messageData)}
          >
            <span className="mr-2">Send</span>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesFooter;
