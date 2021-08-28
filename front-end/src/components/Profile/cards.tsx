import { ComponentChildren, FunctionalComponent, h } from "preact";
import { SongData } from 'data/song';

interface Props {
  children?: ComponentChildren;
  num: number;
  song: SongData;
}

const CardComponent: FunctionalComponent<Props> = ({ num, song }: Props) => {
  const { title, artist } = song;

  return (
    <div>
      <div>
        <h1>{`Favourite Song No. ${num}`}</h1>
      </div>
      <div>{`song: ${title} by ${artist}`}</div>
    </div>
  );
};

export default CardComponent;
