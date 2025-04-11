/**
 * Generates an extract of all thoughts based on the provided attributes
 *
 * @param {object[]} thoughts
 * @param {string} thoughts[].id - the uuid of the Thought
 * @param {string} thoughts[].input - the raw input saved from the user
 * @param {object} thoughts[].extract - the AI generated extract of the thought
 * @param {string[]} [attributes] - optional array of attributes to pull out of the extract
 * @returns {Promise<{}>}
 */
export const generateThoughtExtracts = async ({
  thoughts,
  attributes = ['emotions', 'people', 'projects', 'categories', 'reminders', 'questions', 'places', 'events']
}) => {
  if (!thoughts) {
    return {};
  }

  const extracts = {};

  // fetches all thoughts and aggregates the extract attributes, skips empty attributes, and removes duplicates
  thoughts.forEach((thought) => {
    const extract = thought?.extract;

    if (extract) {
      attributes.forEach((attribute) => {
        if (Array.isArray(extract[attribute])) {
          if (!extracts[attribute]) {
            extracts[attribute] = [];
          }

          extract[attribute].forEach((item) => {
            if (!extracts[attribute].includes(item)) {
              extracts[attribute].push(item);
            }
          });
        }
      });
    }
  });

  return extracts;
};
