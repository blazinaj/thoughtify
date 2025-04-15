import { useModal } from '../../../../../utils/hooks/useModal';
import { ThoughtExtractInsight } from './ThoughtExtractInsight';
import { Chip } from '@mui/material';
import { sentenceCase } from 'change-case';
import { Link } from 'react-router-dom';

/**
 * Displays the value of a Thought Extract Attribute as a chip that opens a modal
 * The modal contains the ThoughtExtractInsight component
 *
 * @param {string} type - the type of the attribute e.g. "People", "Projects"
 * @param {string} value - the value of the attribute e.g. "bob", "project 1"
 * @returns {Element} - chip that is a modal button
 * @constructor
 */
export const ThoughtExtractAttributeChip = ({ type, value }) => {
  if (!type) {
    type = 'unknown';
  }

  if (!value) {
    value = 'unknown';
  }

  const title = `${sentenceCase(type)}: ${value}`;
  let route = `/thoughts/${type}/${value}`;
  if (type === 'projects') {
    route = `/projects/${value}`;
  }
  const button = (
    <Chip
      title={sentenceCase(type)}
      component={Link}
      sx={{
        cursor: 'pointer'
      }}
      label={sentenceCase(value)}
      size={'small'}
      to={`/thoughts/${type}/${value}`}
    />
  );
  // const children = <ThoughtExtractInsight type={type} value={value} />;

  // const modal = useModal({
  //   title,
  //   children,
  //   button
  // });

  return button;
};
