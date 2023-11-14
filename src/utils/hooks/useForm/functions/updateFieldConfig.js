/**
 * Adds new properties to input from the given field config
 * @param {FormFieldConfig} newFieldConfig - the new field configuration for the form update
 * @param {function} setInput - form input state setter function
 */
export const updateFieldConfig = (newFieldConfig, setInput) => {
  setInput((input) => {
    const newInput = { ...input };
    // eslint-disable-next-line no-restricted-syntax
    for (const field in newFieldConfig) {
      // eslint-disable-next-line no-prototype-builtins
      if (!newInput.hasOwnProperty(field)) {
        const fieldObj = newFieldConfig[field];
        if (fieldObj?.defaultValue) {
          newInput[field] = fieldObj.defaultValue;
        } else {
          newInput[field] = '';
        }
      }
    }
    return { ...newInput };
  });
};
