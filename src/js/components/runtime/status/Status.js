import React from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';

import Home from 'grommet/components/icons/base/Home';
import PlayIcon from 'grommet/components/icons/base/PlayFill';
import StopIcon from 'grommet/components/icons/base/StopFill';
import InProgressIcon from 'grommet/components/icons/base/InProgress';

import PanelLayout from '../PanelLayout';
import NodeSettings from './NodeSettings';
import BootstrapSettings from './BootstrapSettings';
import RegistrySettings from './RegistrySettings';

import { startNode, stopNode, STATES } from '../../../core/actions/runtime';

const getIcon = (state) => {
  switch (state) {
    case 'init':
    case 'stopped':
      return <PlayIcon />;

    case 'started':
      return <StopIcon />;

    case 'starting':
    case 'stopping':
      return <InProgressIcon />;
  }
};

const getLabel = (state) => {
  switch (state) {
    case 'init':
    case 'stopped':
      return 'Start';

    case 'starting':
      return 'Starting';

    case 'stopping':
      return 'Stopping';

    case 'started':
      return 'Stop';
  }
};

class Status extends React.Component {

  static propTypes = {
    state: React.PropTypes.oneOf(STATES),
    startNode: React.PropTypes.func.isRequired,
    stopNode: React.PropTypes.func.isRequired
  };

  render() {
    let clickAction;
    switch (this.props.state) {
      case 'init':
      case 'stopped':
        clickAction = this.props.startNode;
        break;

      case 'started':
        clickAction = this.props.stopNode;
        break;
    }

    return (
      <PanelLayout title="Status" icon={<Home />}>
        <Box flex>
          <List>
            <NodeSettings />
            <RegistrySettings />
            <BootstrapSettings />
          </List>
        </Box>
        <Footer size="small" pad="small" justify="between" separator="top" style={{ backgroundColor: '#f5f5f5' }}>
          <Paragraph margin="none" />
          <Button
            primary
            label={getLabel(this.props.state)}
            icon={getIcon(this.props.state)}
            onClick={clickAction}
            style={{ width: 175 }}
            className="kevoree-btn"
          />
        </Footer>
      </PanelLayout>
    );
  }
}

export default connect(
  state => ({
    state: state.runtime.state
  }),
  { startNode, stopNode }
)(Status);
