import React from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';

import s from './styles.css';

import CodeMirror from './CodeMirror';
import './kevs-parser';
import kevsHint from './kevs-hint';
import kevsLint from './kevs-lint';

import { mergeModel, executeScript } from '../../core/actions/kevscript';

const KevScript = (props) => (
  <Grid className={s.container}>
    <Cell col={2} shadow={2}>
      {Object.keys(props.ctxVars).map((name, i) => (
        <Grid key={i}>
          <Cell col={6}>
            <Textfield
              label="Key"
              floatingLabel
              value={name}
            />
          </Cell>
          <Cell col={6}>
            <Textfield
              label="Value"
              floatingLabel
              value={props.ctxVars[name]}
            />
          </Cell>
        </Grid>
      ))}
    </Cell>
    <Cell col={10} shadow={2}>
      <CodeMirror
        value={props.script}
        linter={kevsLint(props.executeScript)}
        hinter={kevsHint(props.model || props.core.getCurrentModel())}
      />
      <Button
        raised
        colored
        className={s.mergeBtn}
        onClick={() => props.mergeModel(props.model)}
      >Merge</Button>
    </Cell>
  </Grid>
);

KevScript.propTypes = {
  core: React.PropTypes.object,
  kevs: React.PropTypes.object,
  script: React.PropTypes.string,
  ctxVars: React.PropTypes.object,
  error: React.PropTypes.object,
  warnings: React.PropTypes.array,
  model: React.PropTypes.object,
  mergeModel: React.PropTypes.func,
  executeScript: React.PropTypes.func,
};

export default connect(
  state => ({
    core: state.runtime.core,
    kevs: state.runtime.kevs,
    script: state.kevscript.script,
    ctxVars: state.kevscript.ctxVars,
    error: state.kevscript.error,
    model: state.kevscript.model,
    warnings: state.kevscript.warnings,
  }),
  { mergeModel, executeScript },
)(KevScript);
