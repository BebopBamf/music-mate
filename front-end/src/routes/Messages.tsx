import {
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
} from "components/Messages";
import { SongPicker } from "components";
import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import EmojiPicker from "components/EmojiPicker/EmojiPicker";
import { SongData } from "data/song";
import { MessageData } from "data/message";
import { Guid } from "data/user";

interface Props {
  guid?: Guid;
}

const Messages: FunctionalComponent<Props> = ({ guid }) => {
  const [isSongPickerOpen, setIsSongPickerOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const [messageData, setMessageData] = useState<MessageData>({
    song: undefined,
    emoji: "🎵",
  });

  console.log(guid);

  const toggleEmojiPicker = () =>
    setIsEmojiPickerOpen((currentValue) => !currentValue);
  const toggleSongPicker = () =>
    setIsSongPickerOpen((currentValue) => !currentValue);

  const handleSendMessage = (messageData: MessageData) => {
    //TODO SEND MESSAGE TO API ENDPOINT
    console.log(messageData);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-300">
      <MessagesHeader />
      <MessagesBody />
      <MessagesFooter
        messageData={messageData}
        toggleEmojiPicker={toggleEmojiPicker}
        toggleSongPicker={toggleSongPicker}
        handleSendMessage={handleSendMessage}
      />
      <SongPicker
        isOpen={isSongPickerOpen}
        setIsOpen={(value: boolean) => setIsSongPickerOpen(value)}
        setSelectedSong={(song: SongData) =>
          setMessageData((currentValue) => ({
            ...currentValue,
            song: song,
          }))
        }
      />
      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        setIsOpen={(value: boolean) => setIsEmojiPickerOpen(value)}
        currentSelection={messageData.emoji}
        setCurrentSelection={(emoji: string) => {
          setMessageData((currentValue) => ({
            ...currentValue,
            emoji: emoji,
          }));
        }}
      />
    </div>
  );
};

export default Messages;
