import React from 'react';
// routes
// components
import { getIcon } from '../../utils/functions/getIcon';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    items: [
      {
        title: 'Thoughts',
        icon: getIcon('mingcute:thought-line'),
        path: '/thoughts'
      },
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
        title: 'Biography',
        icon: getIcon('prime:book'),
        path: '/biography'
      }
    ]
  }
];

export default sidebarConfig;
