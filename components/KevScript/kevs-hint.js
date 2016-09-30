import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint';

const STATEMENTS = [
  'add', 'attach', 'bind', 'detach', 'move', 'network',
  'start', 'stop', 'remove', 'set', 'unbind',
];
const STATEMENTS_REGEX =
  /^(\s*)\b(add|repo|include|remove|move|set|attach|detach|network|bind|unbind|start|stop|pause)\b/;

function createElement(data) {
  return {
    text: data.text,
    className: 'cm-kevs-hint-elem',
    closeOnUnfocus: false,
    render: elem => {
      ReactDOM.render((
        <div>
          <span className={`type ${data.type}`}>
            {data.type.substr(0, 1)}
          </span>
          <span className="text">
            {data.text}
          </span>
        </div>
      ), elem);
    },
  };
}

function createElemData(type, desc) {
  return elem => ({ type, text: elem.name, desc });
}

function getAttributes(instance) {
  if (instance.dictionary) {
    return instance.dictionary.values.array.map(createElemData('attr'));
  }
  return [];
}

function findRootInstanceByName(name, model) {
  if (model) {
    let instance = model.findNodesByID(name);
    if (instance) {
      return instance;
    }
    instance = model.findGroupsByID(name);
    if (instance) {
      return instance;
    }
    instance = model.findHubsByID(name);
    if (instance) {
      return instance;
    }
  }
  return null;
}

function getInstance(path, model) {
  if (model) {
    if (path.length === 0) {
      return model;
    }
    if (path.length === 1) {
      return findRootInstanceByName(path[0], model);
    } else if (path.length === 2) {
      const node = model.findNodesByID(path[0]);
      if (node) {
        return node.findComponentsByID(path[1]);
      }
    }
  }
  return null;
}

function getInstances(instance) {
  if (instance.metaClassName() === 'org.kevoree.ContainerRoot') {
    return instance.nodes.array.map(createElemData('node'))
      .concat(instance.groups.array.map(createElemData('group')))
      .concat(instance.hubs.array.map(createElemData('chan')));
  }
  return [];
}

function getComponents(instance) {
  if (instance.metaClassName() === 'org.kevoree.ContainerNode') {
    return instance.components.array.map(createElemData('comp'));
  }
  return [];
}

function getBindings(instance) {
  if (instance.metaClassName() === 'org.kevoree.ComponentInstance') {
    return instance.provided.array.map(createElemData('input'))
      .concat(instance.required.array.map(createElemData('output')));
  }
  return [];
}

export default model =>
  cm => {
    console.log('Start hinting...');
    const cursor = cm.getCursor();
    const token = cm.getTokenAt(cursor);
    const line = cm.getLine(cursor.line);
    const lineStart = line.substr(0, token.end);
    const match = STATEMENTS_REGEX.exec(lineStart);

    let list = [];

    if (match) {
      const statement = match[2];
      // in a statement
      // trying to access/add on instance
      let path = token.string.split('.').filter(str => str.trim().length > 0);
      if (path.length === 1 && path[0].length === 0) {
        path = [];
      }
      let instance;
      switch (statement) {
        case 'set':
          instance = getInstance(path, model);
          if (instance) {
            list = getComponents(instance)
              .concat(getInstances(instance))
              .concat(getAttributes(instance));
          }
          break;

        case 'bind':
        case 'unbind':
          instance = getInstance(path, model);
          if (instance) {
            list = getComponents(instance)
              .concat(getInstances(instance))
              .concat(getBindings(instance))
              .filter(elem => {
                if (path.length === 0) {
                  return elem.type === 'node';
                } else if (path.length === 1) {
                  return elem.type === 'comp';
                } else if (path.length === 2) {
                  return elem.type === 'input' || elem.type === 'output';
                }
                return true;
              });
          }
          break;

        case 'add':
          if (token.type === 'delimiter') {
            list = [
              createElemData('version')({ name: 'LATEST' }),
              createElemData('version')({ name: 'RELEASE' }),
            ];
          }
          break;

        case 'network':
          if (path.length === 0) {
            list = model.nodes.array.map(createElemData('node'));
          } else if (path.length === 1) {
            list = model.findNodesByID(path[0])
              .networkInformation.array.map(createElemData('network'));
          } else if (path.length === 2) {
            list = model.findNodesByID(path[0])
              .findNetworkInformationByID(path[1])
              .values.array.map(createElemData('value'));
          }
          break;

        case 'attach':
        case 'detach':
          if (path.length === 0) {
            list = model.nodes.array.map(createElemData('node'))
              .concat(model.groups.array.map(createElemData('group')));
          }
          break;

        default:
          break;
      }
    } else {
      // blank new line
      if (token.type !== 'comment') {
        // not a comment line
        list = STATEMENTS.map(stat => ({ type: 'statement', text: stat }));
      }
    }

    console.log('Hinting done', list.map(createElement));
    return {
      list: list.map(createElement),
      from: CodeMirror.Pos(cursor.line, cursor.ch), // eslint-disable-line
      to: CodeMirror.Pos(cursor.line, token.end), // eslint-disable-line
    };
  };
