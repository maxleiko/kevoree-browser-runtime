import React from 'react';
import { connect } from 'react-redux';
import CodeMirror from 'codemirror/lib/codemirror';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import s from './styles.css';

import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/selection-pointer';
import './kevs-parser';
import './kevs-hint';
import kevsLint from './kevs-lint';

import { mergeScript } from '../../core/actions/kevscript';

class KevScript extends React.Component {
  static propTypes = {
    kevs: React.PropTypes.object,
    script: React.PropTypes.string,
    ctxVars: React.PropTypes.object,
    dispatch: React.PropTypes.func,
  };

  componentDidMount() {
    CodeMirror.fromTextArea(this.textarea, {
      mode: 'kevscript',
      theme: 'kevscript',
      lineWrapping: true,
      lineNumbers: true,
      styleActiveLine: true,
      extraKeys: {
        Tab: false,
        'Ctrl-Space': 'autocomplete',
      },
      gutters: ['CodeMirror-lint-markers'],
      lint: {
        getAnnotations: kevsLint(
          this.props.dispatch,
          this.props.script,
          this.props.kevs,
          this.props.ctxVars
        ),
        async: true,
      },
    });
  }

  render() {
    return (
      <Grid className={s.container}>
        <Cell col={2} shadow={2}>
          {Object.keys(this.props.ctxVars).map((name, i) => (
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
                  value={this.props.ctxVars[name]}
                />
              </Cell>
            </Grid>
          ))}
        </Cell>
        <Cell col={10} shadow={2}>
          <textarea
            ref={node => (this.textarea = node)}
            defaultValue={this.props.script}
            className={s.editor}
          />
          <Button
            raised
            colored
            className={s.mergeBtn}
            onClick={() => this.props.dispatch(mergeScript())}
          >Merge</Button>
        </Cell>
      </Grid>
    );
  }
}

export default connect(
  state => ({
    kevs: state.runtime.kevs,
    script: state.kevscript.script,
    ctxVars: state.kevscript.ctxVars,
  })
)(KevScript);
