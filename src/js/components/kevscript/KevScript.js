import React from 'react';
import { connect } from 'react-redux';

import Animate from 'grommet/components/Animate';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';

import Edit from 'grommet/components/icons/base/Edit';
import Play from 'grommet/components/icons/base/PlayFill';

import { STATES } from '../../core/actions/runtime';
import { updateScript } from '../../core/actions/kevscript';

import PanelLayout from '../PanelLayout';
import PanelMenu from '../PanelMenu';
import AceKevSEditor from './AceKevSEditor';
import Logger from '../logs/Logger';

const LOGGER_ENTER = { "animation": "slide-up", "duration": 250 };
const LOGGER_LEAVE = { "animation": "slide-down", "duration": 250 };

const getLabel = (state) => {
  return 'Merge';
};

const getIcon = (state) => {
  return <Play />;
};

class KevScript extends React.Component {
  static propTypes = {
    state: React.PropTypes.oneOf(STATES).isRequired,
    script: React.PropTypes.string.isRequired,
    updateScript: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { showLogs: true, logs: [] };
  }

  onLog(log) {
    this.state.logs.push({
      id: performance.now(),
      time: Date.now(),
      level: log.type,
      tag: log.tag,
      content: log.message
    });
    this.setState({ logs: this.state.logs });
  }

  toggleLogs() {
    this.setState({ showLogs: !this.state.showLogs });
  }

  onClearLogs() {
    this.setState({ logs: [] });
  }

  getEditorHeight() {
    console.log('getEditorHeight...');
    let height = 300;
    if (this.editorContainerEl) {
      height = this.editorContainerEl.offsetHeight;
    }

    console.log('Value =', height);
    return height;
  }

  renderMenu() {
    return (
      <PanelMenu direction="row" align="center">
        <Anchor label={this.state.showLogs ? 'Hide logs':'Show logs'} onClick={() => this.toggleLogs()} />
        <Anchor label="Clean logs" onClick={() => this.onClearLogs()} />
      </PanelMenu>
    );
  }

  render() {
    return (
      <PanelLayout title="KevScript" icon={<Edit />} menu={this.renderMenu()}>
        <div className="kevoree-panel-content">
          <AceKevSEditor
            value={this.props.script}
            onLog={log => this.onLog(log)}
            onChange={this.props.updateScript} />
            <Animate enter={LOGGER_ENTER} leave={LOGGER_LEAVE} visible={this.state.showLogs}>
              <Logger
                className="kevscript-logger"
                messages={this.state.logs}
                autoScroll
              />
            </Animate>
        </div>
        <div className="kevoree-panel-footer">
          <Footer flex="grow" size="small" pad="small" justify="between" separator="top" style={{ backgroundColor: '#f5f5f5' }}>
            <Paragraph margin="none" />
            <Button
              primary
              label={getLabel(this.props.state)}
              icon={getIcon(this.props.state)}
              onClick={() => {}}
              style={{ width: 175 }}
              className="kevoree-btn"
            />
          </Footer>
        </div>
      </PanelLayout>
    );
  }
}

export default connect(
  state => ({
    state: state.runtime.state,
    script: state.kevscript.script
  }),
  { updateScript }
)(KevScript);
