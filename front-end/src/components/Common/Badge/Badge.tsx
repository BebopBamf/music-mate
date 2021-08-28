import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  contents: string;
}

const Badge: FunctionalComponent<Props> = (props: Props) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
      {props.contents}
    </span>
  );
};

export default Badge;
