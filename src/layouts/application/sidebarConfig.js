import React from 'react';
// routes
// components
import { getIcon } from '../../utils/functions/getIcon';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    items: [
      {
        title: 'Journal',
        icon: getIcon('carbon:book'),
        path: '/journal'
      },
      {
        title: 'Health',
        icon: getIcon('ri:health-book-line'),
        path: '/health'
      },
      {
        title: 'Projects',
        icon: getIcon('ic:round-workspaces'),
        path: '/projects'
      }
    ]
  }
];

export default sidebarConfig;
