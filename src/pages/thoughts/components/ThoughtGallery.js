import { useDataAccordion } from '../../../utils/hooks/useDataAccordion';
import { Thought } from '../../../models';
import { ThoughtDetails } from './ThoughtDetails';
import {Link, Stack, Typography} from '@mui/material';
import {ThoughtOverallTone} from "./ThoughtOverallTone";

export const ThoughtGallery = ({journalEntry, thoughts}) => {

  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id)
    }
    return undefined
  }

  const getBorder = (item) => {
    if (item?.extract?.overallTone === "positive") {
      return "2px solid green"
    }
    if (item?.extract?.overallTone === "negative") {

      return "2px solid #ff9800" // mui warning

    }
      return "2px solid grey"

  }

  const accordion = useDataAccordion({
   items: thoughts,
    model: Thought,
    typename: 'Thought',
    titleField: (item) => {
      return (
        <Stack direction={'row'} spacing={2}
        >
          <Typography onClick={e => e.stopPropagation()}>
            <Link
                href={`/thoughts/${item?.id}`}
                underline="hover"
                color={"inherit"}
            >
              {item?.input}
            </Link>
          </Typography>
        </Stack>
      );
    },
    detailsComponent: <ThoughtDetails />,
    sortFunction: (a, b) => (b?.date || b?.createdAt)?.localeCompare(a?.date || a?.createdAt),
    predicate: getPredicate(),
    enableSubscription: true,
      accordionStyle: (item) => {
           return {
                borderLeft: getBorder(item),
            }
      }
  });

  return <div style={{borderRadius: "16px"}}>{accordion.display}</div>;
};
