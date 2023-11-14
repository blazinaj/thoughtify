import { useDetails } from '../index';

export const Details = (props) => {
  const details = useDetails(props);

  return props.card === true ? details.card : details.display;
};
