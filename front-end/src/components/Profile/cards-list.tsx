import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map, zip } from "lodash/fp";
import CardComponent from './cards';
import { FavouriteSongs } from 'data/user';

interface Props {
  children?: ComponentChildren;
  // favouriteSongs: FavouriteSongs; 
}

const TitleBar: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div>
      <ul role="list" class="space-y-3">
        
        <li key={0} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={1} />
        </li>

        <li key={1} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={2} />
        </li>

        <li key={2} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
          <CardComponent num={3} />
        </li>

      </ul>
    </div>
  );
};

export default TitleBar;
