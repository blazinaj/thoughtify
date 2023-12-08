import {Button} from "@mui/material";
import * as React from "react";

export const HealthCategoryStatusButton = ({status, ...props}) => {

  const getStatus = (status) => {
    switch (status) {
      case 'good':
        return 'success';
      case 'fair':
        return 'warning';
      case 'mixed':
        return 'info';
      case 'poor':
        return 'error';
      default:
        return 'info';
    }
  }

  return (
    <Button
      variant={'contained'}
      color={getStatus(status)}
      {...props}
    >
      {status}
    </Button>
  );
}