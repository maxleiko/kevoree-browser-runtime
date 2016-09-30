import React from 'react';
import CodeMirror from 'codemirror/lib/codemirror';

import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/selection-pointer';

class CodeMirrorComp extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    linter: React.PropTypes.func,
    hinter: React.PropTypes.func,
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
        getAnnotations: this.props.linter,
        async: true,
      },
      hintOptions: {
        hint: this.props.hinter,
      },
    });
  }

  render() {
    return (
      <textarea
        ref={node => (this.textarea = node)}
        value={this.props.value}
        onChange={() => {}}
      ></textarea>
    );
  }
}

export default CodeMirrorComp;
