import { ComponentChildren, FunctionalComponent, h } from "preact";
import MessageListItem from "./MessageListItem";

interface Props {
  children?: ComponentChildren;
}

const MessageList: FunctionalComponent<Props> = (props: Props) => {
  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
      <MessageListItem />
    </ul>
  );
};

export default MessageList;
