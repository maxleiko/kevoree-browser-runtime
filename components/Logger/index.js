import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import { Cell } from 'react-mdl/lib/Grid';

import s from './styles.css';
import Line from './Line';

import { clearLogs } from '../../core/actions/log';

const Logger = ({ logs, onClearClick }) => (
  <div className={s.logger}>
    <div className={s.loggerContainer}>
      <Cell col={12} shadow={2} className={s.scroller}>
        {logs.map((log, i) => (
          <Line key={i} {...log} />
        ))}
      </Cell>
    </div>
    {Boolean(logs.length) && (
      <Button
        accent
        className={s.clearBtn}
        onClick={onClearClick}
      >Clear logs</Button>
    )}
  </div>
);

Logger.propTypes = {
  logs: React.PropTypes.array,
  onClearClick: React.PropTypes.func,
};

export default connect(
  state => ({ logs: state.log.logs }),
  { onClearClick: clearLogs }
)(Logger);
