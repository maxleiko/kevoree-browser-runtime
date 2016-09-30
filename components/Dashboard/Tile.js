import React from 'react';
import { Provider } from 'react-redux';
import cx from 'classnames';
import s from './tile.css';
import IconButton from 'react-mdl/lib/IconButton';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';

class Tile extends React.Component {

  static stateTypes = {
    open: React.PropTypes.bool,
  };

  static propTypes = {
    kComp: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const Comp = this.props.kComp.ui();

    Object.getOwnPropertyNames(this.props.kComp.constructor.prototype)
      .filter(name => name.startsWith('in_'))
      .forEach(name => {
        console.log('INPUT', name);
        const func = this.props.kComp[name];
        console.log('func', func);
        this.props.kComp[name] = (msg, cb) => {
          func.call(this.props.kComp, [msg, cb]);
          this.props.kComp.store.dispatch({ type: 'INPUT', name, message: msg });
          console.log('dispatch', { type: 'INPUT', name, message: msg });
        };
      });

    return (
      <div className={s.tile}>
        <div className={cx('row', s.header)}>
          <div className={cx('drag-anchor', s.description)}>
            <span className={s.name}>{this.props.kComp.name}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{this.props.kComp.getModelEntity().typeDefinition.name}</span>
          </div>
          <div className={s.menu} style={{ display: 'none' }}>
            <IconButton name="more_vert" id={this.props.kComp.path} />
            <Menu target={this.props.kComp.path} align="right" style={{ right: '2px' }}>
              <MenuItem>Hide</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="overlay"></div>
        <div className={s.content}>
          <Provider store={this.props.kComp.store}>
            <Comp instance={this.props.kComp} />
          </Provider>
        </div>
      </div>
    );
  }
}

export default Tile;
