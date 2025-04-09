import { useDatastore } from '../../../utils/hooks/useDatastore';
import { JournalEntry, JournalEntryThoughts } from '../../../models';
import { Grid } from '@mui/material';
import Card from '../../../utils/components/Card';
import { formatDate } from '../functions/createJournalTimeline';
import { DeleteItemButton } from '../../../utils/components/DeleteItemButton';
import { DataStore } from '@aws-amplify/datastore';
import Thoughts from '../../thoughts/components/Thoughts';
import * as React from 'react';

export const JournalTimelineItemDetails = ({ item, handleClose }) => {
  const datastore = useDatastore({
    model: JournalEntry,
    itemId: item.id,
    enableSubscription: true
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card
          title={formatDate(datastore?.item?.date, datastore?.item?.cadence)}
          subTitle={datastore?.item?.isLoading ? 'Loading..' : undefined}
          actions={[
            <DeleteItemButton
              item={item}
              model={JournalEntry}
              onBeforeDelete={async () => {
                return DataStore.delete(JournalEntryThoughts, (j) => j.journalEntryId.eq(item.id));
              }}
              onAfterDelete={async () => {
                handleClose && handleClose();
              }}
            />
          ]}
        >
          {datastore?.item?.entry}
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card title={'Thoughts'}>
          <Thoughts journalEntry={item} />
        </Card>
      </Grid>
    </Grid>
  );
};
