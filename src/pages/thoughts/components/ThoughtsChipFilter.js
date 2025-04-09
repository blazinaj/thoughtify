import {Chip} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const ThoughtsChipFilter = ({label, onClick, show, color}) => {
  return (
    <Chip
      label={label}
      onClick={onClick}
      variant={show ? "contained" : "outlined"}
      color={color}
      sx={{
        cursor: "pointer"
      }}
      onDelete={onClick}
      deleteIcon={
        show ? <Visibility/> : <VisibilityOff/>
      }
    />
  )
}