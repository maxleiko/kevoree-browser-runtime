import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/lint/lint';

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

function getWarnings(warnings, lines) {
  return warnings.map(warning => {
    const line = findLine(warning.pos, lines);
    return {
      severity: 'warning',
      message: warning.message,
      from: CodeMirror.Pos( // eslint-disable-line new-cap
        line, relativeToLine(warning.pos[0], lines)),
      to: CodeMirror.Pos( // eslint-disable-line new-cap
        line, relativeToLine(warning.pos[1], lines)),
    };
  });
}

export default (executeScript) =>
  (text, updateLinting, options, cm) => {
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

    executeScript(text)
      .then(({ warnings }) => updateLinting(cm, getWarnings(warnings, lines)))
      .catch(({ error, warnings }) => {
        const lintErrors = [];
        if (error.nt) {
          let message = `Unable to match '${error.nt}'`;
          if (error.nt === 'ws') {
            message = 'Unable to match \'whitespace\'';
          } else if (error.nt === 'kevScript') {
            message = 'A line must start with a statement (add, attach, set, etc.)';
          } else if (TOKENS.indexOf(error.nt) >= 0) {
            message = `Expected statement or comment (do you mean '${(error.nt.split('Token').shift())}'?)`; // eslint-disable-line max-len
          }
          lintErrors.push({
            severity: 'error',
            message,
            from: CodeMirror.Pos( // eslint-disable-line new-cap
              error.line - 1,
              (error.col === 0) ? 0 : error.col - 1,
            ),
            to: CodeMirror.Pos( // eslint-disable-line new-cap
              error.line - 1,
              (error.col === 0) ? 1 : error.col,
            ),
          });
        } else {
          if (error.pos) {
            const line = findLine(error.pos, lines);
            lintErrors.push({
              severity: 'error',
              message: error.message,
              from: CodeMirror.Pos( // eslint-disable-line new-cap
                line,
                relativeToLine(error.pos[0], lines)
              ),
              to: CodeMirror.Pos( // eslint-disable-line new-cap
                line,
                relativeToLine(error.pos[1], lines),
              ),
            });
          }
        }
        updateLinting(cm, lintErrors.concat(getWarnings(warnings, lines)));
      });
  };
