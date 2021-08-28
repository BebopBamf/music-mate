import { ComponentChildren, FunctionalComponent, h } from "preact";
import { map } from "lodash/fp";
import MessageListItem from "./MessageListItem";
import useSWR from "swr";
import { ChatData } from "data/chat";

const FailPage = () => (
  <div>
    <h1>Failure!</h1>
  </div>
);

const MessageList: FunctionalComponent = () => {
  const { data, error } = useSWR("/chats");

  const transformSongData = map((data: ChatData, key: number) => (
    <MessageListItem chat={data} key={key} />
  ));

  if (error) return <FailPage />;

  if (!data)
    return (
      <div className="animate-pulse">
        <ul
          role="list"
          className="divide-y divide-solid divide-gray-200 overflow-y-scroll"
        >
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="">
            <div className="flex flex-row py-4 space-x-4 items-center">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-5xl" />
              </div>
              <div className="flex flex-col flex-1 truncate">
                <div className="h-8 bg-gray-100 w-3/4 rounded-md" />
                <div className="bg-gray-100 py-1 flex flex-row space-x-2 px-2 rounded-lg mt-1">
                  <div className="block bg-gray-200 w-10 rounded-xl" />
                  <div className="flex flex-col flex-1 space-y-1">
                    <div className="bg-gray-200 h-6 w-full block" />
                    <div className="bg-gray-50 h-3 w-7/12 block" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );

  return (
    <ul role="list" className="divide-y divide-gray-200 overflow-y-scroll">
      {transformSongData(data)}
    </ul>
  );
};

export default MessageList;
