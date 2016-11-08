import React from 'react';
import App from 'grommet/components/App';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';

import StatusIcon from './StatusIcon';

class Runtime extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired
  };

  static childContextTypes = {
    runtime: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.runtime = null;
  }

  getChildContext() {
    return { runtime: this.runtime };
  }

  render() {
    return (
      <App centered={false}>
        <Split flex="right">
          <Sidebar colorIndex="grey-2" fixed={true} size="xsmall">
            <Header size="small" separator="bottom" style={{ padding: 6 }}>
              <img src="img/logo2.png" title="Kevoree Browser Runtime"/>
            </Header>
            <Menu primary={true}>
              <Anchor path="/runtime/status" label="Status" icon={<StatusIcon />} />
              <Anchor path="/runtime/logs" label="Logs" />
              <Anchor path="/runtime/grid" label="Grid" />
            </Menu>
            <Footer size="small" pad="small">
              <p>DEV_VERSION</p>
            </Footer>
          </Sidebar>
          {this.props.children}
        </Split>
      </App>
    );
  }
}

export default Runtime;
