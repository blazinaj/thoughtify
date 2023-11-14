import { useDataAccordion } from '../index';

/**
 * An accordion that utilizes a model query and subscription
 * @returns {JSX.Element}
 * @constructor
 */
const DataAccordion = (props) => useDataAccordion(props).display;

export default DataAccordion;
