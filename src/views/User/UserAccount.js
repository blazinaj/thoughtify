import {Icon} from '@iconify/react';
import {capitalCase} from 'change-case';
import {useEffect, useState} from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import {Box, Stack, Tab, Tabs} from '@mui/material';
// redux
import {useDispatch} from '../../demo/redux/store';
import {getAddressBook, getCards, getInvoices, getNotifications, getProfile} from '../../demo/redux/slices/user';
// routes
// hooks
// components
import {AccountBilling, AccountGeneral, AccountNotifications} from '../../demo/components/_dashboard/user/account';
import AccountDelete from "./AccountDelete";
import AccountChangePassword from "./AccountChangePassword";

// ----------------------------------------------------------------------

export const UserAccount = () => {
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'billing',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling />
    },
    // {
    //   value: 'notifications',
    //   icon: <Icon icon={bellFill} width={20} height={20} />,
    //   component: <AccountNotifications />
    // },
    {
      value: 'change-password',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountChangePassword />
    },
    {
      value: 'delete-account',
      icon: <Icon icon="mdi:delete-forever-outline" width={20} height={20} style={{color: "red"}} />,
      component: <AccountDelete />
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack spacing={5}>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={handleChangeTab}
      >
        {ACCOUNT_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>
      {ACCOUNT_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Stack>
  );
}

export default UserAccount;
