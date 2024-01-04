import React from 'react';
// routes
// components
import { getIcon } from '../../utils/functions/getIcon';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    items: [
      {
        title: 'Personal',
        icon: getIcon('carbon:user-avatar-filled'),
        children: [
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
          },
        ]
      },
      {
        title: '3D Printing',
        icon: getIcon('carbon:printer'),
        children: [
          {
            title: 'Prints',
            icon: getIcon('carbon:3d-printer'),
            path: '/prints'
          },
          {
            title: 'Models',
            icon: getIcon('carbon:3d-printer'),
            path: '/print-models'
          },
          {
            title: 'Printers',
            icon: getIcon('carbon:printer'),
            path: '/printers'
          },
          ]
      }
    ]
  }
];

export default sidebarConfig;
