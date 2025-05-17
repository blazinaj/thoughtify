export const extractReminders = () => {
    return {
        type: 'extract_reminders',
        description: 'Extracts reminders from text',
        parameters: [
            {
                name: 'text',
                type: 'string',
                description: 'The text to extract reminders from'
            }
        ],
        returns: {
            type: 'array',
            items: {
                type: 'string'
            },
            description: 'An array of extracted reminders'
        }
    };
}