import {
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
} from "components/Messages";
import { SongPicker } from "components";
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import EmojiPicker from "components/EmojiPicker/EmojiPicker";

const Messages: FunctionalComponent = () => {
  const [isSongPickerOpen, setIsSongPickerOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  return (
    <div className="h-screen w-screen flex flex-col">
      <MessagesHeader />
      <MessagesBody />
      <button
        onClick={() => {
          setIsSongPickerOpen(true);
        }}
      >
        Open Song Picker
      </button>
      <button
        onClick={() => {
          setIsEmojiPickerOpen(true);
        }}
      >
        Open Emoji Picker
      </button>
      <MessagesFooter />
      <SongPicker
        isOpen={isSongPickerOpen}
        setIsOpen={(value: boolean) => setIsSongPickerOpen(value)}
        setSelectedSong={(value: string) => setSelectedSong(value)}
      />
      <EmojiPicker
        isOpen={isEmojiPickerOpen}
        setIsOpen={(value: boolean) => setIsEmojiPickerOpen(value)}
        currentSelection={selectedEmoji}
        setCurrentSelection={(emoji: string) => {
          setSelectedEmoji(emoji);
        }}
      />
    </div>
  );
};

export default Messages;
