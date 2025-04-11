import { useModal } from '../../../../../utils/hooks/useModal';
import { ThoughtExtractInsight } from './ThoughtExtractInsight';
import { Chip } from '@mui/material';
import {sentenceCase} from "change-case";

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
  const title = `${type}: ${value}`;
  const button = <Chip title={type} label={sentenceCase(value)} />;
  const children = <ThoughtExtractInsight type={type} value={value} />;

  const modal = useModal({
    title,
    children,
    button
  });

  return modal.modalButton;
};
