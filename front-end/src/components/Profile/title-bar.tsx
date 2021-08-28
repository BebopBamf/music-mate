import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import * as fp from "lodash/fp";

interface Props {
  children?: ComponentChildren;
  profName: string;
  emoji: string;
  location: string;
}

const TitleBar: FunctionalComponent<Props> = ({profName, emoji, location}) => {
  return (
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">{`${emoji} ${profName}`}</h1>
      <h2 class="">{location}</h2>
    </div>
  );
};

export default TitleBar;
