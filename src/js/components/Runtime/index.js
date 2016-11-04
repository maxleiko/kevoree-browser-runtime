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

const Runtime = ({ children }) => (
  <App centered={false}>
    <Split flex="right">
      <Sidebar colorIndex="grey-2" fixed={true} size="xsmall">
        <Header size="small" justify="between" pad="small">
          <Title>Kevoree Browser Runtime</Title>
        </Header>
        <Menu primary={true}>
          <Anchor path="/runtime/status" label="Status" />
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
  children: React.PropTypes.node
};

export default connect()(Runtime);
