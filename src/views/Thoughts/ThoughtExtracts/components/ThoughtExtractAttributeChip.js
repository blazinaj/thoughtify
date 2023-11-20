import {useModal} from "../../../../utils/hooks/useModal";
import {ThoughtExtractInsight} from "./ThoughtExtractInsight";
import {Chip} from "@mui/material";

/**
 * Displays the value of a Thought Extract Attribute
 * @param type
 * @param value
 * @param thought
 * @returns {Element}
 * @constructor
 */
export const ThoughtExtractAttributeChip = ({type, value, thought}) => {

  const title = `${type}: ${value}`;
  const button = (
    <Chip
      title={type}
      label={value}
    />
  )
  const children = (
    <ThoughtExtractInsight
      type={type}
      value={value}
    />
  )

  const modal = useModal({
    title,
    children,
    button,
  })

  return modal.modalButton;

}