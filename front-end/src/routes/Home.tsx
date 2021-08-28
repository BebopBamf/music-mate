import { FunctionalComponent, render, h } from "preact";
import { MessageList } from "../components";

const Home: FunctionalComponent = () => {
  return (
    <div className="flex flex-col h-screen px-4 py-4 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">My Music Mates</h1>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg overflow-y-scroll flex-auto">
        <div class="px-4 py-5 sm:p-6">
          <MessageList />
        </div>
      </div>
      <div className="flex items-center width-full justift-bottom">
        <button
          type="button"
          class="w-full items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="">Find a new PlayPal</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
