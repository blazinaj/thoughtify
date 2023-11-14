import React from 'react';
// routes
// components
import {getIcon} from '../../utils/functions/getIcon';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    subheader: 'Interact',
    items: [
      {
        title: 'AI Tutor',
        icon: getIcon('fluent-mdl2:chat-bot'),
        path: '/interact/tutor',
      },
    ]
  },
  {
    subheader: 'Learn',
    items: [
      {
        title: 'Dashboard',
        icon: getIcon('material-symbols:play-lesson-outline'),
        path: '/learn/dashboard',
      },

      {
        title: 'Catalog',
        icon: getIcon('carbon:catalog'),
        path: '/learn/catalog',
      },
      {
        title: "Certifications",
        icon: getIcon('carbon:certificate'),
        path: '/learn/certifications',
      }
    ]
  },
  {
    subheader: 'Teach',
    items: [
      {
        title: 'Lessons',
        icon: getIcon('carbon:application'),
        path: '/teach/lessons',
      },
      {
        title: 'Courses',
        icon: getIcon('carbon:book'),
        path: '/teach/courses',
      }
    ]
  }
];

export default sidebarConfig;
