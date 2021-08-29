import React, { useState, Fragment } from 'react';
import { Transition } from "@headlessui/react";

// import { Profile } from '../routes';
import { MessageList, Modal } from '../components';
import { Spinner } from '../components/Common/Icons';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [matchedProfileId, setMatchedProfileId] = useState('');

  const matchedProfile = (
    <Fragment>
      <Profile guid={matchedProfileId} isEditable={false} />
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
      setMatchedProfileId("13db5e8e-e4b8-4590-ac3c-654419dcead5");
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen px-4 py-4 space-y-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">My Music Mates</h1>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg overflow-y-scroll flex-auto">
        <div className="px-4 py-5">
          <MessageList />
        </div>
      </div>
      <div className="flex items-center width-full justift-bottom">
        <button
          type="button"
          className="w-full items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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
