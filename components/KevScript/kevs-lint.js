import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/lint/lint';
import {
  changeCtxVars, changeModel, changeScript,
} from '../../core/actions/kevscript';

const TOKENS = [
  'repoToken', 'includeToken', 'addToken', 'removeToken', 'moveToken',
  'setToken', 'attachToken', 'detachToken', 'networkToken', 'bindToken',
  'unbindToken', 'namespaceToken', 'startToken', 'stopToken',
  'pauseToken', 'comment',
];

function findLine(pos, lines) {
  let line = -1;
  for (let i = 0; i < lines.length; i++) {
    if ((pos[0] >= lines[i].start) && (pos[1] <= lines[i].end)) {
      line = lines[i].line;
      break;
    }
  }
  return line;
}

function relativeToLine(ch, lines) {
  let val = 0;
  for (let i = 0; i < lines.length; i++) {
    const tmp = val + (lines[i].end - lines[i].start) + 1; // + 1 is for \n
    if (tmp > ch) {
      return ch - val;
    }
    val = tmp;
  }
  return ch - val;
}

export default (dispatch, kevs, ctxVars) => {
  let previousScript = null;
  return (text, updateLinting, options, cm) => {
    if (previousScript !== text) {
      let start = 0;
      const lines = text.split('\n').map((line, i) => {
        const obj = {
          start,
          end: start + line.length,
          line: i,
        };
        start += line.length + 1;
        return obj;
      });

      const clonedCtxVars = { ...ctxVars };
      kevs.parse(text, options.model, clonedCtxVars, (err, model, warnings) => {
        const lintErrors = [];
        if (err) {
          if (err.nt) {
            let message = `Unable to match '${err.nt}'`;
            if (err.nt === 'ws') {
              message = 'Unable to match \'whitespace\'';
            } else if (err.nt === 'kevScript') {
              message = 'A line must start with a statement (add, attach, set, etc.)';
            } else if (TOKENS.indexOf(err.nt) >= 0) {
              message = `Expected statement or comment (do you mean '${(err.nt.split('Token').shift())}'?)`; // eslint-disable-line max-len
            }
            lintErrors.push({
              severity: 'error',
              message,
              from: CodeMirror.Pos( // eslint-disable-line new-cap
                err.line - 1,
                (err.col === 0) ? 0 : err.col - 1,
              ),
              to: CodeMirror.Pos( // eslint-disable-line new-cap
                err.line - 1,
                (err.col === 0) ? 1 : err.col,
              ),
            });
          } else {
            if (err.pos) {
              const line = findLine(err.pos, lines);
              lintErrors.push({
                severity: 'error',
                message: err.message,
                from: CodeMirror.Pos( // eslint-disable-line new-cap
                  line,
                  relativeToLine(err.pos[0], lines)
                ),
                to: CodeMirror.Pos( // eslint-disable-line new-cap
                  line,
                  relativeToLine(err.pos[1], lines),
                ),
              });
            }
          }
        } else {
          options.lintedModel = model; // eslint-disable-line
        }

        warnings.forEach((warning) => {
          const line = findLine(warning.pos, lines);
          lintErrors.push({
            severity: 'warning',
            message: warning.message,
            from: CodeMirror.Pos( // eslint-disable-line new-cap
              line, relativeToLine(warning.pos[0], lines)),
            to: CodeMirror.Pos( // eslint-disable-line new-cap
              line, relativeToLine(warning.pos[1], lines)),
          });
        });

        dispatch(changeScript(text));
        dispatch(changeCtxVars(clonedCtxVars));
        dispatch(changeModel(model));
        updateLinting(cm, lintErrors);
        previousScript = text;
      });
    }
  };
};
