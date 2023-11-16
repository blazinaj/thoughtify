import '../styles/ProgressLoader.css';
import { useEffect, useState } from 'react';
import { Box, Slide, Typography } from '@mui/material';
import Card from '../../Card';
import { useDatastore } from '../../../hooks/useDatastore';

/**
 * Displays a progress loader with a subscription to an item in the datastore
 *
 * @param {string} title - The title of the progress loader to place at the top
 * @param {string} progressMessage - The initial progress message to display
 * @param {object} model - The model of the datastore item to subscribe to
 * @param {string} itemId - The ID of the datastore item to subscribe to
 * @returns {JSX.Element}
 * @constructor
 */
export const ProgressLoaderDisplay = ({ title = 'In Progress...', progressMessage, model, itemId }) => {
  const [_progressMessage, _setProgressMessage] = useState(progressMessage);

  const [slideIn, setSlideIn] = useState(false);

  /**
   * When the progress message changes, slide the current message out and then slide the new message in with a delay
   */
  useEffect(() => {
    if (_progressMessage) {
      setSlideIn(false);

      setTimeout(() => {
        setSlideIn(true);
      }, 500);
    }
  }, [_progressMessage]);

  /**
   * Track the Job progress using datastore
   * @type {{items: *[]}}
   */
  const datastore = useDatastore({
    model,
    itemId,
    enableSubscription: true
  });

  /**
   * Updates the progress message when the datastore updates
   */
  useEffect(() => {
    if (datastore?.item?.job?.progressMessage !== _progressMessage) {
      _setProgressMessage(datastore?.item?.job?.progressMessage);
    }
  }, [datastore?.item?.job?.progressMessage]);

  return (
    <Card className="progress-loader" title={datastore.item?.job?.name || title}>
      <Box>
        <Slide appear={true} in={slideIn} direction={slideIn ? 'right' : 'left'}>
          <Box>
            <Typography>{datastore?.item?.job?.progressMessage}</Typography>
          </Box>
        </Slide>
      </Box>
    </Card>
  );
};
