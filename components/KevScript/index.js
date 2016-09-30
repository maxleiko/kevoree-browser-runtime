import React from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import DataTable, { TableHeader } from 'react-mdl/lib/DataTable';

import s from './styles.css';

import CodeMirror from './CodeMirror';
import './kevs-parser';
import kevsHint from './kevs-hint';
import kevsLint from './kevs-lint';

import { mergeModel, executeScript } from '../../core/actions/kevscript';

const KevScript = (props) => {
  const ctxVarsArray = Object.keys(props.ctxVars)
    .map((key, i) => ({ id: i, key, value: props.ctxVars[key] }));

  return (
    <Grid className={s.container}>
      <Cell phone={12} tablet={12} col={2} shadow={2}>
        <strong className={s.ctxVarsTitle}>Context variables:</strong>
        <Cell col={12}>
          <DataTable
            selectable
            shadow={0}
            rowKeyColumn="id"
            rows={ctxVarsArray}
            className={s.ctxVarsTable}
          >
            <TableHeader name="key">Key</TableHeader>
            <TableHeader name="value">Value</TableHeader>
          </DataTable>
        </Cell>
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
};

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
