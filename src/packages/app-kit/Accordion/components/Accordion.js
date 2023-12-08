import { useDataAccordion } from '../index';

/**
 * An accordion that utilizes a model query and subscription
 * @returns {JSX.Element}
 * @constructor
 */
export const Accordion = (props) => useDataAccordion(props).display;