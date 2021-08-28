import { ChevronLeft, User } from "components/Common/Icons";
import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  children?: ComponentChildren;
}

const MessageHeader: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div className="h-16 flex-shrink-0 flex flex-row py-2 px-4 items-center bg-white text-center">
      <a href="/">
        <div className="h-12 w-12 flex items-center text-gray-900">
          <ChevronLeft />
        </div>
      </a>
      <div className="text-xl font-bold text-gray-900 truncate flex-1">
        Matt, from Sydney 😻
      </div>
      <a href="/profile">
        <div className="h-12 w-12 flex items-center text-gray-900">
          <User />
        </div>
      </a>
    </div>
  );
};

export default MessageHeader;
