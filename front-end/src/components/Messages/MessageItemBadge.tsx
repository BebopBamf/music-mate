import { Badge } from "components/Common";
import { ComponentChildren, FunctionalComponent, h } from "preact";

interface Props {
  contents: string;
}

const MessageitemBadge: FunctionalComponent<Props> = ({ contents }: Props) => {
  return (
    <li className="text-center">
      <Badge contents={contents} />
    </li>
  );
};

export default MessageitemBadge;
