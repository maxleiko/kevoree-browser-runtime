import React from 'react';
import Box from 'grommet/components/Box';
import Grid from 'grommet/components/icons/base/Grid';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import PanelLayout from './PanelLayout';

const Dashboard = () => (
  <PanelLayout title="Dashboard" icon={<Grid />}>
    <Box>
      <ListPlaceholder unfilteredTotal={0} filteredTotal={0}
        emptyMessage="There is no components at the moment." />
    </Box>
  </PanelLayout>
);

export default Dashboard;
