import PropTypes from 'prop-types';
// material
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import {
  Timeline as MUITimeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
import { fDateTime } from '../../../functions/formatTime';
// utils
// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: new Date('10/19/1983'),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: new Date('10/19/1999'),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: new Date('10/19/2109'),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: new Date('10/19/2345'),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: new Date('10/19/2900'),
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

export const useTimeline = ({ title, items }) => {
  const display = (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        {items?.length > 0 ? (
          <MUITimeline>
            {items?.map((item, index) => (
              <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
            ))}
          </MUITimeline>
        ) : (
          <i>Timeline is Empty</i>
        )}
      </CardContent>
    </Card>
  );

  return {
    display
  };
};

export const Timeline = (props) => useTimeline(props).display;
