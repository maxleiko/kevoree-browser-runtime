import React from 'react';
import Box from 'grommet/components/Box';
import GridIcon from 'grommet/components/icons/base/Grid';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import PanelLayout from '../PanelLayout';

const Grid = ({}, { core }) => (
  <PanelLayout title="Grid" icon={<GridIcon />}>
    <Box>
      <ListPlaceholder unfilteredTotal={0} filteredTotal={0}
        emptyMessage="There is no components at the moment." />
    </Box>
  </PanelLayout>
);

Grid.contextTypes = {
  core: React.PropTypes.object
};

export default Grid;
