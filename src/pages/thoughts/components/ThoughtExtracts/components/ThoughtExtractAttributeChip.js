import { Chip } from '@mui/material';
import { sentenceCase } from 'change-case';
import { Link } from 'react-router-dom';
import {
  Alarm,
  Category,
  Event,
  FaceRetouchingNatural,
  Map as MapIcon,
  Person,
  PsychologyAlt,
  Workspaces
} from '@mui/icons-material';

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

  let linkId = value;
  let label = value;

  if (type === 'projects') {
    linkId = value.id;
    label = value.name;
  }

  const iconMap = {
    people: <Person />,
    places: <MapIcon />,
    emotions: <FaceRetouchingNatural />,
    projects: <Workspaces />,
    events: <Event />,
    reminders: <Alarm />,
    questions: <PsychologyAlt />,
    categories: <Category />
  };

  const button = (
    <Chip
      title={sentenceCase(type)}
      component={Link}
      sx={{
        cursor: 'pointer'
      }}
      label={label && sentenceCase(label)}
      size={'small'}
      to={`/thoughts/${type}/${linkId}`}
      icon={iconMap[type]}
    />
  );

  return button;
};
