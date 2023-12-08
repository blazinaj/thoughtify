import { useDataAccordion } from '../../../utils/hooks/useDataAccordion';
import { Thought } from '../../../models';
import { ThoughtDetails } from './ThoughtDetails';
import {Link, Stack, Typography} from '@mui/material';

export const ThoughtGallery = ({journalEntry}) => {

  const getPredicate = () => {
    if (journalEntry?.id) {
      return (item) => item.journalEntries.journalEntry.id.eq(journalEntry.id)
    }
    return undefined
  }

  const accordion = useDataAccordion({
    model: Thought,
    typename: 'Thought',
    titleField: (item) => {
      return (
        <Stack direction={'row'} spacing={2}>
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
  });

  return <div style={{borderRadius: "16px"}}>{accordion.display}</div>;
};
