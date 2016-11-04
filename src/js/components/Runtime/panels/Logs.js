import React from 'react';
import { connect } from 'react-redux';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';
import Cli from 'grommet/components/icons/base/Cli';

import PanelLayout from './PanelLayout';

const Logs = ({ logs }) => (
  <PanelLayout title="Logs" icon={<Cli />}>
    <List selectable>
      <ListPlaceholder unfilteredTotal={logs.length} filteredTotal={logs.length}
        emptyMessage="There is no logs at the moment." />
      {logs.map((log, i) => (
        <ListItem key={i}>
          {log.message}
        </ListItem>
      ))}
    </List>
  </PanelLayout>
);

Logs.propTypes = {
  logs: React.PropTypes.array.isRequired
};

export default connect(
  state => ({ logs: state.runtime.logs })
)(Logs);
