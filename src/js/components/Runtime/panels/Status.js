import React from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Home from 'grommet/components/icons/base/Home';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import PlayIcon from 'grommet/components/icons/base/PlayFill';
import StopIcon from 'grommet/components/icons/base/StopFill';
import InProgressIcon from 'grommet/components/icons/base/InProgress';

import PanelLayout from './PanelLayout';

import { changeName, startNode, stopNode, STATES } from '../../../core/actions/runtime';

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
    name: React.PropTypes.string.isRequired,
    changeName: React.PropTypes.func.isRequired,
    startNode: React.PropTypes.func.isRequired,
    stopNode: React.PropTypes.func.isRequired
  };

  renderFooter() {
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
      <Footer size="small" pad="small">
        <Form direction="row" compact>
          <FormField label="Node name" htmlFor="name">
            <input id="name" type="text" value={this.props.name} onChange={e => this.props.changeName(e.target.value)} />
          </FormField>
        </Form>
        <Box direction="row" flex="grow" justify="end">
          <Button
            primary
            label={getLabel(this.props.state)}
            icon={getIcon(this.props.state)}
            onClick={clickAction}
            style={{ width: 175 }}
          />
        </Box>
      </Footer>
    );
  }

  render() {
    return (
      <PanelLayout title="Status" icon={<Home />} footer={this.renderFooter()}>
        <Box direction="column" flex="grow">
          TODO add the KevScript editor right here
        </Box>
      </PanelLayout>
    );
  }
}

export default connect(
  state => ({
    state: state.runtime.state,
    name: state.runtime.name
  }),
  { changeName, startNode, stopNode }
)(Status);
