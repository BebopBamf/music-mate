import { ComponentChildren, FunctionalComponent, h } from "preact";
import { Badge } from "components/Common";
import MessageItemSong from "./MessageItemSong";

interface Props {
  children?: ComponentChildren;
}

const MessagesBody: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div className="bg-gray-300 flex-1 overflow-y-scroll">
      <ul className="flex flex-col min-h-[1000px] space-y-6 my-6 px-4">
        <MessageItemSong isSender={false} />
        <MessageItemSong isSender={true} />
        <li className="text-center">
          <Badge contents="3 days ago" />
        </li>
        <li className="flex flex-row-reverse ml-auto bg-gray-50 w-3/4 h-20 rounded-xl p-4">
          <div className="flex-1">Message</div>
          <div className="flex-shrink-0 flex items-center justify-center">
            Emoji
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MessagesBody;
