import React from 'react';
import { connect } from 'react-redux';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import Status from 'grommet/components/icons/Status';

import { STATES } from '../../core/actions/runtime';

const getIcon = (state) => {
  let value = 'unknown';

  switch (state) {
    case 'started':
    case 'stopping':
      value = 'ok';
      break;

    case 'stopped':
      value = 'unknown';
      break;

    case 'error':
      value = 'critical';
      break;
  }

  return (
    <Status value={value} size="small" style={{ float: 'right' }} />
  );
};

const Runtime = ({ children, state }) => (
  <App centered={false}>
    <Split flex="right">
      <Sidebar colorIndex="grey-2" fixed={true} size="small">
        <Header size="small" justify="between" pad="small" colorIndex="grey-4-a">
          <Title>Kevoree Runtime</Title>
        </Header>
        <Menu primary={true}>
          <Anchor path="/runtime/status" label="Status" icon={getIcon(state)} />
          <Anchor path="/runtime/logs" label="Logs" />
          <Anchor path="/runtime/dashboard" label="Dashboard" />
        </Menu>
        <Footer size="small" pad="small">
          <p>DEV_VERSION</p>
        </Footer>
      </Sidebar>
      {children}
    </Split>
  </App>
);

Runtime.propTypes = {
  children: React.PropTypes.node,
  state: React.PropTypes.oneOf(STATES)
};

export default connect(
  state => ({ state: state.runtime.state })
)(Runtime);
