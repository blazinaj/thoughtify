import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../demo/routes/paths';

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
  // {
  //   title: 'Our Mission',
  //   icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
  //   path: '/mission'
  // },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'Contact us', path: PATH_PAGE.contact },
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Privacy', path: PATH_PAGE.privacy },
          { title: 'Terms and Conditions', path: '/terms-and-conditions' },
        ]
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: '/learn/dashboard' }]
      }
    ]
  },
];

export default menuConfig;
