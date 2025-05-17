import React from 'react';
// routes
// components
import { getIcon } from '../../utils/functions/getIcon';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    items: [
      // {
      //   title: 'Streams',
      //   icon: getIcon('fluent:stream-32-filled'),
      //   path: '/streams'
      // },
      {
        title: 'Journal',
        icon: getIcon('carbon:book'),
        path: '/journal'
      },
      {
        title: 'Projects',
        icon: getIcon('ic:round-workspaces'),
        path: '/projects'
      },
      {
        title: 'Health',
        icon: getIcon('ri:health-book-line'),
        path: '/health'
      },
    ]
  }
];

export default sidebarConfig;
