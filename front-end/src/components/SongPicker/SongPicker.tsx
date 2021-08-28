import { Close } from "components/Common/Icons";
import SlideUp from "components/Common/SlideUp/SlideUp";
import { SongData } from "data/song";
import { Fragment, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import SongPickerResult from "./SongPickerResult";
import { debounce } from "lodash";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSelectedSong: (value: SongData) => void;
}

const SongPicker: FunctionalComponent<Props> = ({
  isOpen,
  setIsOpen,
  setSelectedSong,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const updateSong = (e: Event) => {
    const inputField = e.target as HTMLInputElement;
    setSearchQuery(inputField.value);

    console.log(searchQuery);
  };

  const songs = [
    {
      uri: "",
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      image: "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      uri: "",
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      image: "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      uri: "",
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      image: "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
  ];

  return (
    <SlideUp isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col pt-6 bg-gray-100 shadow-2xl rounded-t-2xl">
        <div className="flex flex-row space-x-2 px-4 mb-6">
          <input
            type="text"
            name="name"
            id="name"
            value={searchQuery}
            onInput={updateSong}
            onKeyDown={debounce(() => console.log("Debounced!"), 1000, {
              maxWait: 2000,
            })}
            autocomplete="off"
            className="block w-full h-12 border-0 border-b-2 border-transparent bg-gray-50 focus:border-gray-300 focus:ring-0 shadow-sm"
            placeholder="Search for a song..."
          />
          <div className="flex-shrink-0 h-12 w-12">
            <button
              type="button"
              className="h-full w-full flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <Close />
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll bg-gray-50 flex-1 pb-4">
          <ul role="list" className="flex flex-col py-4 space-y-4 mx-4">
            {songs.map((song, key) => (
              <SongPickerResult
                song={song}
                key={key}
                onClick={(song: SongData) => {
                  setSelectedSong(song);
                  setIsOpen(false);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </SlideUp>
  );
};

export default SongPicker;
