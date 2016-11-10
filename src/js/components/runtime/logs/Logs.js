import React from 'react';
import { connect } from 'react-redux';

import List from 'grommet/components/List';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import Cli from 'grommet/components/icons/base/Cli';

import PanelLayout from '../PanelLayout';
import Line from './Line';

const Logs = ({ messages }) => (
  <PanelLayout title="Logs" icon={<Cli />}>
    <List selectable>
      <ListPlaceholder unfilteredTotal={messages.length} filteredTotal={messages.length}
        emptyMessage="There is no logs at the moment." />
      {messages.map(msg => <Line key={msg.id} {...msg} />)}
    </List>
  </PanelLayout>
);

Logs.propTypes = {
  messages: React.PropTypes.array.isRequired
};

export default connect(
  state => ({ messages: state.logs.messages })
)(Logs);
