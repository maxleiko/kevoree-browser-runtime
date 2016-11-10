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
    core: React.PropTypes.object,
    logger: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.core = null;
    this.logger = null;
  }

  getChildContext() {
    return {
      core: this.core,
      logger: this.logger
    };
  }

  render() {
    return (
      <App centered={false}>
        <Split flex="right">
          <Sidebar colorIndex="grey-2" fixed={true} size="xsmall">
            <Header size="small" separator="bottom" style={{ padding: 6 }}>
              <img src="img/logo2.png" title="Kevoree Browser Runtime" style={{ paddingLeft: 20 }} />
            </Header>
            <Menu primary={true}>
              <Anchor path="/status" label="Status" icon={<StatusIcon />} />
              <Anchor path="/logs" label="Logs" />
              <Anchor path="/grid" label="Grid" />
              <Anchor path="/about" label="About" />
            </Menu>
            <Footer size="small" pad="small">
              <p>{/* add version */}</p>
            </Footer>
          </Sidebar>
          {this.props.children}
        </Split>
      </App>
    );
  }
}

export default Runtime;
