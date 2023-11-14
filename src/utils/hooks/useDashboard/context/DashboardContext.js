import React, { useContext } from 'react';

const DashboardContext = React.createContext({});

const useDashboardContext = () => useContext(DashboardContext);

export { DashboardContext, useDashboardContext };
