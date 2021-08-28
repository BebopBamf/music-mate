import { ComponentChildren, FunctionalComponent, h } from "preact";
import { useState } from 'preact/hooks';
import { map } from "lodash/fp";
import { CardData } from '../../data/profile';
import CardComponent from './cards';

interface Props {
  children?: ComponentChildren;
}

const TitleBar: FunctionalComponent<Props> = (props: Props) => {
  
  const createCards = map((data: CardData) => (
    <li key={data.id} class="bg-white shadow overflow-hidden rounded-md px-6 py-4">
        <CardComponent />
    </li>
  ));

  const [cardDataList, setCardDataList] = useState([{id: 0}, {id: 1}, {id: 2}]);

  return (
    <div>
      <ul role="list" class="space-y-3">
        {createCards(cardDataList)}
      </ul>
    </div>
  );
};

export default TitleBar;
