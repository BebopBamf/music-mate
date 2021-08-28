import { formatTime } from "components/Common/Helpers";
import { Close, Explicit } from "components/Common/Icons";
import SlideUp from "components/Common/SlideUp/SlideUp";
import { Fragment, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSelectedSong: (value: string) => void;
}

const SongPicker: FunctionalComponent<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const songs = [
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
    {
      title: "The Lazy song skjdlghdfjklhgdfjkghdkfjhdfkjhgkfj",
      artist: "Bruno Mars",
      explicit: true,
      duration: 190213,
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000485178c6c624a95d1bd02ba1fa02",
    },
  ];

  return (
    <SlideUp isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <div className="w-full flex flex-col pt-6 bg-gray-100 shadow-2xl rounded-t-2xl">
        <div className="flex flex-row space-x-2 px-4 mb-6">
          <input
            type="text"
            name="name"
            id="name"
            autocomplete="off"
            className="block w-full h-12 border-0 border-b-2 border-transparent bg-gray-50 focus:border-gray-300 focus:ring-0 shadow-sm"
            placeholder="Search for a song..."
          />
          <div className="flex-shrink-0 h-12 w-12">
            <button
              type="button"
              className="h-full w-full flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => props.setIsOpen(false)}
            >
              <span className="sr-only">Close panel</span>
              <Close />
            </button>
          </div>
        </div>
        <div class="overflow-y-scroll bg-gray-50 flex-1 pb-4">
          <ul role="list" className="flex flex-col py-4 space-y-4 mx-4">
            {songs.map((song) => (
              <li className="shadow overflow-hidden rounded-md px-4 py-4 h-20 bg-white flex flex-row">
                <div className="h-12 w-12">
                  <img src={song.imageUrl} className="h-12 w-12" />
                </div>
                <div className="pl-4 flex-1 flex flex-col truncate">
                  <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0 ">
                    <div className="truncate flex-1 font-bold">
                      {song.title}
                    </div>
                    <div className="truncate flex-shrink-0">
                      {formatTime(song.duration)}
                    </div>
                  </div>
                  <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0">
                    <div className="truncate flex-1">{song.artist}</div>
                    <Explicit />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideUp>
  );
};

export default SongPicker;
