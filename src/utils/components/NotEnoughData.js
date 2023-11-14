import React from 'react';
import { Button } from '@mui/material';

/**
 * Displays a message telling the user that there is not enough data to render the item
 * @param {string} message - a message to display to the user (what kind of data is missing)
 * @param {string} itemName - the component or entity that doesn't have enough data (for use in tests)
 * @param {string} callToAction.message - message that tells the user what to do so the component gets enough data
 * @param {function} callToAction.function - if present will show a "Click here" link at the start of callToAction.message that will call the function onClick
 * @returns {JSX.Element}
 * @constructor
 */
const NotEnoughData = ({
  message = 'There is not enough data to render this component',
  callToAction = {},
  itemName = ''
}) => {
  const onClickCallToAction = () => {
    if (callToAction?.function) {
      callToAction.function();
    }
  };

  const validCTAFunction = callToAction?.function && typeof callToAction.function === 'function';

  return (
    <span data-testid={`not-enough-data${itemName === '' ? '' : `-${itemName}`}`}>
      <span>{`${message} `}</span>
      {callToAction?.placeOnNewLine && <br data-testid="not-enough-data-br" />}
      {validCTAFunction && (
        <Button
          size={callToAction?.size || ''}
          id={`call-to-action-button${itemName === '' ? '' : `-${itemName}`}`}
          data-testid={`call-to-action-button${itemName === '' ? '' : `-${itemName}`}`}
          style={{ paddingRight: '0', paddingTop: '.2em', marginLeft: '-0.5em' }}
          color="link"
          onClick={onClickCallToAction}
        >
          Click Here
        </Button>
      )}
      <span>{callToAction?.message || (validCTAFunction && ' to fix this.') || ''}</span>
    </span>
  );
};

export default NotEnoughData;
