import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  children?: ComponentChildren;
}

const CardComponent: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div>
      <div>Some Random Stub</div>
      <div>Some Random Description</div>
    </div>
  );
};

export default CardComponent;
