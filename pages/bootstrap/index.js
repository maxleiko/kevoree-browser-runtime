import React from 'react';
import { connect } from 'react-redux';
import Textfield from 'react-mdl/lib/Textfield';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import Icon from 'react-mdl/lib/Icon';

import Layout from '../../components/Layout';
import history from '../../core/history';
import s from './styles.css';
import {
  bootstrap, changeVersion, retryBootstrap,
} from '../../core/actions/bootstrap';

const getIcon = module => {
  if (module.installing) {
    return 'system_update_alt';
  }
  if (module.downloading) {
    return 'file_download';
  }
  if (module.downloaded) {
    return 'check_circle';
  }
  if (module.installed) {
    return 'check';
  }
  return '';
};

const isDisabled = module => module.downloading || module.installing;

const disableBtn = modules => Object.keys(modules)
  .some(name => isDisabled(modules[name]));

class Bootstrap extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
    state: React.PropTypes.oneOf(['init', 'done', 'inProgress', 'error']),
    modules: React.PropTypes.object,
    onVersionChange: React.PropTypes.func,
    onRetryClick: React.PropTypes.func,
    onStartClick: React.PropTypes.func,
    onBootstrapClick: React.PropTypes.func,
  };

  componentWillMount() {
    if (this.props.state === 'done') {
      history.push('/runtime');
    }
  }

  componentDidMount() {
    document.title = 'Bootstrap - Kevoree Browser Runtime';
  }

  render() {
    const data = {
      title: null,
      offset: 4,
      col: 4,
      btnLabel: null,
      onClick: null,
    };

    switch (this.props.state) {
      default:
      case 'init':
        data.title = 'Bootstrap options';
        data.btnLabel = 'Bootstrap';
        data.onClick = this.props.onBootstrapClick;
        break;

      case 'inProgress':
        data.title = 'Bootstrapping...';
        data.btnLabel = 'Bootstrap';
        break;

      case 'error':
        data.title = 'Error during bootstrapping';
        data.btnLabel = 'Retry';
        data.onClick = this.props.onRetryClick;
        data.offset = 2;
        data.col = 8;
        return (
          <Layout>
            <Cell col={12}>
              <Cell offsetDesktop={data.offset} col={data.col} tablet={12}>
                <h4>{data.title}</h4>
              </Cell>
              <Cell offsetDesktop={data.offset} col={data.col} tablet={12}>
                <Grid shadow={2}>
                  <pre>
                    <code>{this.props.error.stack}</code>
                  </pre>
                </Grid>
              </Cell>
            </Cell>
            <Cell col={12}>
              <Grid>
                <Grid>
                  <Button
                    raised
                    colored
                    onClick={data.onClick}
                  >{data.btnLabel}</Button>
                </Grid>
              </Grid>
            </Cell>
          </Layout>
        );
    }

    return (
      <Layout>
        <Cell col={12}>
          <Cell offsetDesktop={data.offset} col={data.col} tablet={12}>
            <h4>{data.title}</h4>
          </Cell>
          <Cell offsetDesktop={data.offset} col={data.col} tablet={12}>
            <Grid shadow={2}>
              {Object.keys(this.props.modules).map((name, i) => (
                <Grid key={i} noSpacing>
                  <Cell col={2} align="middle">
                    <Icon className={s.icon} name={getIcon(this.props.modules[name])} />
                  </Cell>
                  <Cell col={10}>
                    <Textfield
                      label={name}
                      floatingLabel
                      value={this.props.modules[name].version}
                      disabled={isDisabled(this.props.modules[name])}
                      onChange={evt => this.props.onVersionChange(name, evt.target.value)}
                    />
                  </Cell>
                </Grid>
              ))}
            </Grid>
          </Cell>
        </Cell>
        <Cell col={12}>
          <Grid>
            <Grid>
              <Button
                raised
                colored
                disabled={disableBtn(this.props.modules)}
                onClick={data.onClick}
              >{data.btnLabel}</Button>
            </Grid>
          </Grid>
        </Cell>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({
    ...state.bootstrap,
  }),
  {
    onBootstrapClick: bootstrap,
    onVersionChange: changeVersion,
    onRetryClick: retryBootstrap,
  }
)(Bootstrap);
