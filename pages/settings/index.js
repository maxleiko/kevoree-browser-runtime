import React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Textfield from 'react-mdl/lib/Textfield';
import Checkbox from 'react-mdl/lib/Checkbox';
import {
  changeHost, changePort, changeSsl, changeResolver,
} from '../../core/actions/settings';

class SettingsPage extends React.Component {

  static propTypes = {
    host: React.PropTypes.string,
    port: React.PropTypes.number,
    ssl: React.PropTypes.bool,
    resolver: React.PropTypes.string,
    changeHost: React.PropTypes.func,
    changePort: React.PropTypes.func,
    changeSsl: React.PropTypes.func,
    changeResolver: React.PropTypes.func,
  };

  componentDidMount() {
    document.title = 'Settings - Kevoree Browser Runtime';
  }

  render() {
    return (
      <Layout>
        <Cell offsetDesktop={2} col={8} shadow={2}>
          <Grid>
            <Cell col={4}>
              <Textfield
                floatingLabel
                label="Registry host"
                value={this.props.host}
                onChange={evt => this.props.changeHost(evt.target.value)}
              />
            </Cell>
            <Cell col={4}>
              <Textfield
                floatingLabel
                pattern="[0-9]{1,5}"
                label="Registry port"
                value={this.props.port}
                onChange={evt => this.props.changePort(evt.target.value)}
              />
            </Cell>
            <Cell col={4} align="middle">
              <Checkbox
                label="SSL"
                checked={this.props.ssl}
                onChange={() => this.props.changeSsl(!this.props.ssl)}
              />
            </Cell>
          </Grid>
        </Cell>
        <Cell offsetDesktop={2} col={8} shadow={2}>
          <Grid>
            <Cell col={4}>
              <Textfield
                floatingLabel
                label="Browser resolver service"
                value={this.props.resolver}
                onChange={evt => this.props.changeResolver(evt.target.value)}
              />
            </Cell>
          </Grid>
        </Cell>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({
    ...state.settings,
  }),
  { changeHost, changePort, changeSsl, changeResolver }
)(SettingsPage);
