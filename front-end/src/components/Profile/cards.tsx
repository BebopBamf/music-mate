import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  children?: ComponentChildren;
  num: number;
}

const CardComponent: FunctionalComponent<Props> = ({ num }: Props) => {
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
