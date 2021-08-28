import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  contents: string;
}

const Badge: FunctionalComponent<Props> = (props: Props) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
      {props.contents}
    </span>
  );
};

export default Badge;
