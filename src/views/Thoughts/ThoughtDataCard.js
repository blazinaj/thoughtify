import {Thought} from "../../models";
import {useDataCard} from "../../utils/hooks/useDataCard";

export const ThoughtDataCard = () => {
  const dataCard = useDataCard({
    model: Thought,
  })

  return dataCard.display;
}