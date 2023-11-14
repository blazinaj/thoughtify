import {useLocation} from "react-router-dom";
import React from "react";

/**
 * Custom hook that builds on useLocation to parse the current params from the url
 * @returns {URLSearchParams}
 */
export const useQueryParams = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}