import React from 'react';
import { connect } from 'react-redux';
import Status from 'grommet/components/icons/Status';

import { STATES } from '../core/actions/runtime';

const StatusIcon = ({ state, size }) => {
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
    <Status value={value} size={size} style={{ float: 'right' }} />
  );
};

StatusIcon.propTypes = {
  state: React.PropTypes.oneOf(STATES),
  size: React.PropTypes.oneOf(['small', 'medium', 'large'])
};

export default connect(
  (state, props) => ({
    state: state.runtime.state,
    size: props.size || 'small'
  })
)(StatusIcon);
