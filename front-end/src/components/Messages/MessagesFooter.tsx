import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  children?: ComponentChildren;
}

const MessagesFooter: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div className="flex-shrink-0">
      <div className="h-16 rounded-t-2xl flex flex-row bg-gray-50">
        <div className="rounded-t-2xl bg-gray-200 px-2 py-3 flex-1">
          <input className="w-full h-full" />
        </div>
        <div className="rounded-t-2xl bg-gray-50 w-28">.</div>
      </div>
    </div>
  );
};

export default MessagesFooter;
