import { Close } from "components/Common/Icons";
import SlideUp from "components/Common/SlideUp/SlideUp";
import { SongData } from "data/song";
import { Fragment, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import SongPickerResult from "./SongPickerResult";
import { debounce } from "lodash";
import useSWR from "swr";
import { any } from "lodash/fp";

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
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error } = useSWR("/search/" + searchQuery);

  console.log(data);

  const updateSong = (e: Event) => {
    const inputField = e.target as HTMLInputElement;
    setSearchQuery(inputField.value);

    console.log(searchQuery);
  };

  interface SearchProps {
    data: any;
    error: any;
  }

  const SearchResults: FunctionalComponent<SearchProps> = ({
    data,
    error,
  }: SearchProps) => {
    if (error) {
      return <p>Error Fetching Songs</p>;
    }

    if (!data)
      return (
        <div className="overflow-y-scroll bg-gray-50 flex-1 pb-4">
          <ul role="list" className="flex flex-col py-4 space-y-4 mx-4">
            <li className="shadow overflow-hidden rounded-md px-4 py-4 h-20 bg-white flex flex-row">
              <div className="h-12 w-12 block" />
              <div className="pl-4 flex-1 flex flex-col truncate">
                <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0 ">
                  <div className="truncate flex-1 font-bold">xxxx</div>
                  <div className="truncate flex-shrink-0">xxx</div>
                </div>
                <div className="flex flex-row items-center space-x-2 truncate flex-shrink-0">
                  <div className="truncate flex-1">xxxxx</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      );

    return (
      <div className="overflow-y-scroll bg-gray-50 flex-1 pb-4">
        <ul role="list" className="flex flex-col py-4 space-y-4 mx-4">
          {data.map((song: any, key: number) => (
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
    );
  };

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
        <SearchResults data={data} error={error} />
      </div>
    </SlideUp>
  );
};

export default SongPicker;
