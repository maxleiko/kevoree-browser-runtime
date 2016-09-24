import React from 'react';
import { connect } from 'react-redux';
import Textfield from 'react-mdl/lib/Textfield';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';

import {
  changeName, startRuntime, stopRuntime,
} from '../../core/actions/runtime';

const Platform = ({ name, state, onNameChanged, onStartClick, onStopClick }) => {
  let actionBtn = null;
  let headerTxt = null;
  switch (state) {
    case 'error':
    case 'ready':
      actionBtn = (
        <Button
          raised
          colored
          onClick={onStartClick}
        >Start</Button>
      );
      headerTxt = (
        <strong>Choose a name for this node:</strong>
      );
      break;

    case 'starting':
      actionBtn = (
        <Button
          raised
          colored
          disabled
        >Start</Button>
      );
      headerTxt = (
        <strong>Platform is starting...</strong>
      );
      break;

    case 'started':
      actionBtn = (
        <Button
          raised
          colored
          onClick={onStopClick}
        >Stop</Button>
      );
      headerTxt = (
        <strong>Platform name:</strong>
      );
      break;

    default:
      break;
  }

  return (
    <div>
      <Cell col={3}>
        <Grid shadow={2}>
          <Cell col={12}>
            {headerTxt}
          </Cell>
          <Cell col={12}>
            <Textfield
              label="Name"
              floatingLabel
              value={name}
              disabled={state === 'started' || state === 'starting'}
              onChange={evt => onNameChanged(evt.target.value)}
            />
          </Cell>
          {actionBtn}
        </Grid>
      </Cell>
    </div>
  );
};

Platform.propTypes = {
  name: React.PropTypes.string,
  state: React.PropTypes.oneOf([
    'init', 'ready', 'started', 'stopped', 'error', 'starting',
  ]),
  onNameChanged: React.PropTypes.func,
  onStartClick: React.PropTypes.func,
  onStopClick: React.PropTypes.func,
};

export default connect(
  (state) => ({
    name: state.runtime.name,
    state: state.runtime.state,
  }),
  {
    onNameChanged: changeName,
    onStartClick: startRuntime,
    onStopClick: stopRuntime,
  }
)(Platform);
