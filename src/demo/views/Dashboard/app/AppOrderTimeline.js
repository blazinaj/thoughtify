import faker from 'faker';
import PropTypes from 'prop-types';
// material
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
// utils
import { fDateTime } from '../../../../utils/functions/formatTime';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: faker.date.past(),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: faker.date.past(),
    type: 'order5'
  }
];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.marketing') ||
              (type === 'order2' && 'success.marketing') ||
              (type === 'order3' && 'info.marketing') ||
              (type === 'order4' && 'warning.marketing') ||
              'error.marketing'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
