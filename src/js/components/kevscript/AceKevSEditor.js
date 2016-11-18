/* globals ace */
import React from 'react';

class AceKevSEditor extends React.Component {
  static propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onLog: React.PropTypes.func
  };

  componentDidMount() {
    this.editor = ace.edit('kevscript-editor');
    this.editor.$blockScrolling = Infinity;
    this.editor.session.on('changeMode', (event, session) => {
      var deps = {
        'tiny-conf': 'latest',
        'kevoree-library': 'next',
        'kevoree-validator': 'latest',
        'kevoree-registry-api': 'latest',
        'kevoree-kevscript': 'next'
      };
      var depsArray = Object.keys(deps)
        .reduce(function (array, key) {
          var path = key === 'tiny-conf' ? 'dist':'browser';
          array.push('https://unpkg.com/' + key + '@' + deps[key] + '/' + path + '/' + key + '.js');
          return array;
        }.bind(this), []);

      session.$worker.on('log', (results) => {
        if (this.props.onLog) {
          this.props.onLog(results.data);
        }
      });

      session.$worker.emit('init', {
        data: {
          deps: depsArray,
          registry: {
            host: 'kevoree.braindead.fr',
            port: 443,
            ssl: true,
            oauth: {
              client_id: 'kevoree_registryapp',
              client_secret: 'kevoree_registryapp_secret'
            }
          }
        }
      });
    });
    this.editor.getSession().setMode('ace/mode/kevscript');
    this.editor.setTheme('ace/theme/kool');
    this.editor.setShowPrintMargin(false);
    this.editor.setFontSize(16);
    this.editor.on('change', () => {
      if (this.props.onChange) {
        this.props.onChange(this.editor.getValue());
      }
    });
    this.editor.setValue(this.props.value, 1);
    this.editor.setOption('highlightActiveLine', true);

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && (this.editor.getValue() !== nextProps.value)) {
      this.editor.setValue(nextProps.value, 1);
    }
  }

  componentWillUnmount() {
    if (this.editor && this.editor.session && this.editor.session.$worker) {
      // remove the linter worker if any
      this.editor.session.$worker.terminate();
    }
  }

  render() {
    if (this.editor) {
      this.editor.resize();
    }
    return (
      <div id="kevscript-editor" />
    );
  }
}

export default AceKevSEditor;
