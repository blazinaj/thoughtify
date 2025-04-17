export const extractPeople = () => {
    return {
        type: 'extract_people',
        description: 'Extracts people from text',
        parameters: [
        {
            name: 'text',
            type: 'string',
            description: 'The text to extract people from'
        }
        ],
        returns: {
        type: 'array',
        items: {
            type: 'string'
        },
        description: 'An array of extracted people'
        }
    };
}