import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map, zip } from "lodash/fp";
import CardComponent from './cards';
import { FavouriteSongs } from 'data/user';
import { SongData } from 'data/song';

interface Props {
  children?: ComponentChildren;
  favouriteSongs: FavouriteSongs; 
}

const TitleBar: FunctionalComponent<Props> = ({ favouriteSongs }: Props) => {
  const noSong: SongData = {
    uri: '',
    title: 'No Song Found',
    artist: 'No Artist Found',
    explicit: false,
    duration: 0,
    image: '',
  };

  const { first, second, third } = favouriteSongs;

  const validateSong = (song?: SongData) => song ? song : noSong;

  return (
    <div>
      <ul role="list" class="space-y-3">
        
        <li key={0} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={1} song={validateSong(first)} />
        </li>

        <li key={1} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={2} song={validateSong(second)} />
        </li>

        <li key={2} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={3} song={validateSong(third)} />
        </li>

      </ul>
    </div>
  );
};

export default TitleBar;
