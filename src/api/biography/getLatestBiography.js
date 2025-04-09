export const getLatestBiography = ({ biographies }) => {
    const sortedBiography = biographies.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedBiography[0];
};