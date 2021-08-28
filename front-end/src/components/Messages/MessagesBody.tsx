import { ComponentChildren, FunctionalComponent, h } from "preact";
import { Badge } from "components/Common";
import MessageItemSong from "./MessageItemSong";
import MessageItemBadge from "./MessageItemBadge";

interface Props {
  children?: ComponentChildren;
}

const MessagesBody: FunctionalComponent<Props> = (props: Props) => {
  //Replace with swr import
  const data = undefined;

  if (!data) {
    return (
      <div className="bg-gray-300 flex-1 overflow-y-scroll">
        <ul className="flex flex-col-reverse space-y-reverse space-y-6 my-6 px-4">
          <li className="flex-row space-x-4 flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center">
            <div className="h-16 w-16 block bg-gray-200" />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="bg-gray-200 h-6 block w-full" />
              <div className="bg-gray-200 h-3 block w-2/3" />
              <div className="bg-gray-200 h-2 block w-1/3" />
            </div>
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 block rounded-full" />
          </li>
          <li className="flex-row-reverse space-x-4 space-x-reverse ml-auto flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center">
            <div className="h-16 w-16 block bg-gray-200" />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="bg-gray-200 h-6 block w-full" />
              <div className="bg-gray-200 h-3 block w-2/3" />
              <div className="bg-gray-200 h-2 block w-1/3" />
            </div>
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 block rounded-full" />
          </li>
          <li className="flex-row-reverse space-x-4 space-x-reverse ml-auto flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center">
            <div className="h-16 w-16 block bg-gray-200" />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="bg-gray-200 h-6 block w-full" />
              <div className="bg-gray-200 h-3 block w-2/3" />
              <div className="bg-gray-200 h-2 block w-1/3" />
            </div>
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 block rounded-full" />
          </li>
          <li className="flex-row space-x-4 flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center">
            <div className="h-16 w-16 block bg-gray-200" />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="bg-gray-200 h-6 block w-full" />
              <div className="bg-gray-200 h-3 block w-2/3" />
              <div className="bg-gray-200 h-2 block w-1/3" />
            </div>
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 block rounded-full" />
          </li>
          <li className="flex-row-reverse space-x-4 space-x-reverse ml-auto flex bg-gray-50 w-11/12 h-24 rounded-xl px-4 py-3 items-center">
            <div className="h-16 w-16 block bg-gray-200" />
            <div className="flex-1 flex flex-col space-y-2">
              <div className="bg-gray-200 h-6 block w-full" />
              <div className="bg-gray-200 h-3 block w-2/3" />
              <div className="bg-gray-200 h-2 block w-1/3" />
            </div>
            <div className="flex-shrink-0 h-16 w-16 bg-gray-200 block rounded-full" />
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-gray-300 flex-1 overflow-y-scroll">
      <ul className="flex flex-col min-h-[1000px] space-y-6 my-6 px-4">
        <MessageItemSong isSender={false} />
        <MessageItemSong isSender={true} />
        <MessageItemBadge contents={"3hrs ago"} />
        <MessageItemSong isSender={false} />
        <MessageItemSong isSender={true} />
      </ul>
    </div>
  );
};

export default MessagesBody;
