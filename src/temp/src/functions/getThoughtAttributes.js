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
export const getThoughtAttributes = async ({
                                                  thoughts,
                                                  attributes = ['emotions', 'people', 'projects', 'categories', 'reminders', 'questions', 'places', 'events', 'tasks']
                                              }) => {
    if (!thoughts) {
        return {};
    }

    const extracts = {};

    // fetches all thoughts and aggregates the extract attributes, skips empty attributes, and removes duplicates
    thoughts.forEach((thought) => {
        attributes.forEach((attribute) => {
            if (Array.isArray(thought[attribute])) {
                if (!extracts[attribute]) {
                    extracts[attribute] = [];
                }

                thought[attribute].forEach((item) => {
                    if (!extracts[attribute].includes(item)) {
                        extracts[attribute].push(item);
                    }
                });
            }
        });
    });

    // ex: {emotions: ['happy', 'sad'], people: ['John Doe']}
    return extracts;
};