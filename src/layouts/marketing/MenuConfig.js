import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import docs from '@iconify/icons-ic/round-description';
// routes
import { PATH_PAGE } from '../../demo/routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/'
  },
  {
    title: 'Documentation',
    icon: <Icon icon={docs} {...ICON_SIZE} />,
    path: 'https://thoughts.mobi/docs'
  },
  {
    title: 'More',
    path: '/pages',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Information',
        items: [
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Contact us', path: PATH_PAGE.contact },
        ]
      },
      {
        subheader: 'Compliance',
        items: [
          { title: 'Privacy', path: PATH_PAGE.privacy },
          { title: 'Terms and Conditions', path: '/terms-and-conditions' }
        ]
      }
    ]
  }
];

export default menuConfig;
