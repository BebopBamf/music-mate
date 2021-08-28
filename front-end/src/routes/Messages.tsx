import {
  MessagesBody,
  MessagesFooter,
  MessagesHeader,
} from "components/Messages";
import { FunctionalComponent } from "preact";

const Messages: FunctionalComponent = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <MessagesHeader />
      <MessagesBody />
      <MessagesFooter />
    </div>
  );
};

export default Messages;
