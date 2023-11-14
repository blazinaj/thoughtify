/**
 * Updates the form input
 * @param {FormInput} newInput - the field values to merge
 * @param {function} setInput - form input state setter function
 */
export const updateInput = (newInput, setInput) => {
  setInput((input) => {
    const tempInput = { ...input };
    // eslint-disable-next-line no-restricted-syntax
    for (const field in newInput) {
      // eslint-disable-next-line no-prototype-builtins
      if (newInput.hasOwnProperty(field)) {
        tempInput[field] = newInput[field];
      }
    }
    return tempInput;
  });
};
