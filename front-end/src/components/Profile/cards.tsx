import { ComponentChildren, FunctionalComponent, h } from "preact";
import { SongData } from 'data/song';

interface Props {
  children?: ComponentChildren;
  num: number;
  song: SongData;
}

const CardComponent: FunctionalComponent<Props> = ({ num, song }: Props) => {
  return (
    <div>
      <div>
        <h1>{`Favourite Song No. ${num}`}</h1>
      </div>
      <div>Some Random Description</div>
    </div>
  );
};

export default CardComponent;
