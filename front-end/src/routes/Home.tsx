import { FunctionalComponent, Fragment, h } from "preact";
import { MessageList, Modal } from "components";
import { useState } from "preact/hooks";
import { Profile } from "routes";
import { Transition } from "@headlessui/react";
import { Spinner } from "components/Common/Icons";

const Home: FunctionalComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [matchedProfileId, setMatchedProfileId] = useState<string>("");

  const matchedProfile = (
    <Fragment>
      <Profile id={matchedProfileId} isEditable={false} />
    </Fragment>
  );

  const modalLoading = (
    <Fragment>
      <div className="flex flex-col mx-12 py-6 text-center items-center justify-center space-y-8">
        <div className="w-20 h-20">
          <Spinner />
        </div>
        <p className="text-sm leading-tight">
          Hold tight! We're matching you with another user somewhere in the
          world. You'll get a chance to view their profile before deciding to be
          their play pal.
        </p>
      </div>
    </Fragment>
  );

  const newPlayPal = () => {
    setIsModalLoading(true);
    setIsModalOpen(true);
    //TEMP CODE IN PLACE OF API CALL
    setTimeout(() => {
      setIsModalLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen px-4 py-4 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">My Music Mates</h1>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg overflow-y-scroll flex-auto">
        <div className="px-4 py-5 sm:p-6">
          <MessageList />
        </div>
      </div>
      <div className="flex items-center width-full justift-bottom">
        <button
          type="button"
          className="w-full items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            newPlayPal();
          }}
          disabled={isModalOpen}
        >
          <span className="">Find a new PlayPal</span>
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isActionEnabled={!isModalLoading}
        cancelButtonText="Nope"
        onCancel={() => {}}
        actionButonText="Start chatting"
        onAction={() => {}}
      >
        <div className="transition-all duration-1000 ease-in-out">
          {isModalLoading ? modalLoading : matchedProfile}
        </div>
      </Modal>
    </div>
  );
};

export default Home;
