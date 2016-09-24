import React from 'react';
import { connect } from 'react-redux';
import Badge from 'react-mdl/lib/Badge';

import history from '../../core/history';
import { changeTab } from '../../core/actions/runtime';

import Layout from '../../components/Layout';
import Platform from '../../components/Platform';
import Logger from '../../components/Logger';
import KevScript from '../../components/KevScript';
import Dashboard from '../../components/Dashboard';
import { Tabs, Tab, TabPanel } from '../../components/Tabs';

class RuntimePage extends React.Component {
  static propTypes = {
    state: React.PropTypes.oneOf([
      'init', 'ready', 'started', 'stopped', 'error', 'starting',
    ]),
    error: React.PropTypes.object,
    logs: React.PropTypes.array,
    bootstrapState: React.PropTypes.string,
    unreadLogs: React.PropTypes.number,
    activeTab: React.PropTypes.number,
    changeTab: React.PropTypes.func,
    changeScript: React.PropTypes.func,
  };

  static contextTypes = {
    store: React.PropTypes.object,
  };

  componentWillMount() {
    if (this.props.bootstrapState !== 'done' || this.props.state === 'init') {
      history.push('/bootstrap');
    }
  }

  componentDidMount() {
    document.title = 'Runtime - Kevoree Browser Runtime';
  }

  validState(states) {
    return states.indexOf(this.props.state) !== -1;
  }

  render() {
    if (!this.validState(['init'])) {
      return (
        <Layout>
          <Tabs
            ripple
            activeTab={this.props.activeTab}
            onChange={this.props.changeTab}
          >
            <Tab>Platform</Tab>
            <TabPanel>
              <Platform />
            </TabPanel>

            <Tab>
              <Badge text={this.props.unreadLogs > 0 ? this.props.unreadLogs : null}>Logs</Badge>
            </Tab>
            <TabPanel>
              <Logger />
            </TabPanel>

            <Tab>KevScript</Tab>
            <TabPanel>
              <KevScript />
            </TabPanel>

            <Tab>Dashboard</Tab>
            <TabPanel>
              <Dashboard />
            </TabPanel>
          </Tabs>
        </Layout>
      );
    }
    return null;
  }
}

export default connect(
  (state) => ({
    state: state.runtime.state,
    error: state.runtime.error,
    logs: state.log.logs,
    unreadLogs: state.log.unread,
    activeTab: state.runtime.activeTab,
    bootstrapState: state.bootstrap.state,
  }),
  { changeTab },
)(RuntimePage);
