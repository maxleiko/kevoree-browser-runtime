import React from 'react';
import { connect } from 'react-redux';

import Cli from 'grommet/components/icons/base/Cli';

import PanelLayout from '../PanelLayout';
import Logger from './Logger';

const Logs = ({ messages }) => (
  <PanelLayout title="Logs" icon={<Cli />}>
    <Logger messages={messages} />
  </PanelLayout>
);

Logs.propTypes = {
  messages: React.PropTypes.array.isRequired
};

export default connect(
  state => ({ messages: state.logs.messages })
)(Logs);
