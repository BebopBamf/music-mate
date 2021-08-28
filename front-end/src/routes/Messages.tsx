import {
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
} from "components/Messages";
import { SongSelector } from "components";
import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

const Messages: FunctionalComponent = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen w-screen flex flex-col">
      <MessagesHeader />
      <MessagesBody />
      <MessagesFooter />
      <button onClick={() => setOpen((prevState) => !prevState)}>CLICK</button>
      <SongSelector open={open} setOpen={(value: boolean) => setOpen(value)} />
    </div>
  );
};

export default Messages;
