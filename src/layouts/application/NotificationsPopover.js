import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@mui/material/styles';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Scrollbar from '../../demo/components/Scrollbar';
import MenuPopover from '../../demo/components/MenuPopover';
import { MIconButton } from '../../demo/components/@material-extend';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { Notification as NotificationModel } from '../../models';
import { DataStore } from '@aws-amplify/datastore';
import { DeleteItemButton } from '../../utils/components/DeleteItemButton';

// ----------------------------------------------------------------------

// const MOCK_NOTIFICATIONS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   title: TITLES[index],
//   description: DESCRIPTIONS[index],
//   avatar: AVATARS[index],
//   type: TYPES[index],
//   createdAt: mockData.time(index),
//   isUnRead: UNREADS[index]
// }));

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.content)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'MESSAGE') {
    return {
      avatar: <img alt={'Notification'} src="/static/icons/ic_notification_chat.svg" />,
      title
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

/**
 * A single Notification Item to display for the user
 * @param notification
 * @returns {JSX.Element}
 * @constructor
 */
function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnread && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItem secondaryAction={<DeleteItemButton model={NotificationModel} item={notification} />}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled'
              }}
            >
              <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.createdAt)}
            </Typography>
          }
        />
      </ListItem>
    </ListItemButton>
  );
}

/**
 * Displays notifications for the user
 * @returns {JSX.Element}
 * @constructor
 */
export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const notificationsDatastore = useDatastore({
    model: NotificationModel,
    typename: 'Notification',
    enableSubscriptions: true
  });

  // const remindersDatastore

  const notifications = notificationsDatastore.items;
  const setNotifications = notificationsDatastore.setItems;

  const totalUnRead = notifications.filter((item) => item.isUnread === true).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    for (const notification of notifications) {
      DataStore.save(
        NotificationModel.copyOf(notification, (updated) => {
          updated.isUnread = false;
        })
      );
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 360 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
