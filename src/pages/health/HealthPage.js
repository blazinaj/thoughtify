import useSettings from '../../utils/hooks/useSettings';
import Page from '../../utils/components/Page';
import { Container, Grid } from '@mui/material';
import HeaderBreadcrumbs from '../../demo/components/HeaderBreadcrumbs';
import { HealthReport } from './components/HealthReport';
import { useDatastore } from '../../utils/hooks/useDatastore';
import { HealthReport as HealthReportModel } from '../../models';
import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const HealthPage = () => {
  const { themeStretch } = useSettings();

  const healthReportDatastore = useDatastore({
    model: HealthReportModel,
    enableSubscription: true
  });

  const [selectedHealthReport, setSelectedHealthReport] = useState(null);

  useEffect(() => {
    if (healthReportDatastore?.length) {
      const sortedHealthReports = healthReportDatastore.sort((a, b) => {
        return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
      });

      if (sortedHealthReports[0]?.id !== selectedHealthReport?.id) {
        setSelectedHealthReport(sortedHealthReports[0]);
      }
    }
  }, []);

  return (
    <Page title="Thoughtify Health">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          icon={'ri:health-book-line'}
          heading="Health Report"
          subHeading={'View your Health-related Thoughts as an AI-Generated Health Report.'}
          // action={
          //     <Box
          //       sx={{
          //           // width: "40%"
          //       }}
          //     >
          //         <HealthReportDatePicker
          //             healthReports={healthReportDatastore.items.map((healthReport) => {
          //                   return  dayjs(healthReport.date || healthReport.createdAt)
          //             })}
          //         />
          //     </Box>
          // }
          links={
            [
              // {name: 'Home', href: 'journal'},
            ]
          }
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HealthReport selectedHealthReport={selectedHealthReport} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default HealthPage;
