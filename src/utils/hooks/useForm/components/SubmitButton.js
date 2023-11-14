import Button from '@mui/material/Button';

/**
 * Submit Button for forms
 * @param submit
 * @param submitDisabled
 * @returns {JSX.Element}
 * @constructor
 */
const SubmitButton = ({ submit, submitDisabled }) => (
  <Button
    className="float-right"
    color="success"
    onClick={async () => submit()}
    style={{ marginTop: '1em', float: 'right' }}
    disabled={submitDisabled}
    title={submitDisabled ? 'Please fill in all required fields' : 'Submit this form'}
    data-testid="useForm-submit-button"
  >
    Submit
  </Button>
);

export default SubmitButton;
