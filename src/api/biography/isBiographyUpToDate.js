import {differenceInDays} from "date-fns";
import {JournalCadence} from "../../models";

export const isBiographyUpToDate = ({ biographies, cadence, thoughts }) => {
    if (!biographies || biographies.length < 1) {
        return false;
    }
    const sortedBiography = biographies.sort((a, b) => new Date(a.date) - new Date(b.date));

    const lastBiographyDate = sortedBiography[0]?.date;
    const today = new Date();

    const difference = differenceInDays(today, new Date(lastBiographyDate));

    if (cadence === JournalCadence.DAILY) {
        return difference === 0;
    }

    if (cadence === JournalCadence.WEEKLY) {
        return difference <= 7;
    }

    if (cadence === JournalCadence.MONTHLY) {
        return difference <= 30;
    }

    if (cadence === JournalCadence.YEARLY) {
        return difference <= 365;
    }
};
