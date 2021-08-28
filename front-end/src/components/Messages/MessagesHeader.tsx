import { ChevronLeft } from "components/Common/Icons";
import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  children?: ComponentChildren;
}

const MessageHeader: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div className="h-16 flex-shrink-0 flex flex-row py-2 px-4 items-center bg-white">
      <div className="h-12 w-12 flex items-center">
        <ChevronLeft />
      </div>
      <div className="text-md font-bold text-gray-900 truncate">
        Matt, from Sydney 😻
      </div>
    </div>
  );
};

export default MessageHeader;
