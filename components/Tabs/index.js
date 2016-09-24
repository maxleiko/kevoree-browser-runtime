import React from 'react';
import cx from 'classnames';
import Tab from './Tab';
import TabPanel from './TabPanel';
import s from './styles.css';

class Tabs extends React.Component {

  static propTypes = {
    ripple: React.PropTypes.bool,
    activeTab: React.PropTypes.number,
    onChange: React.PropTypes.func,
    children: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab,
    };
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    if (this.root) {
      window.componentHandler.downgradeElements(this.root);
    }
  }

  onTabClick(id) {
    this.setState({ activeTab: id });
    this.props.onChange(id);
  }

  render() {
    const classes = cx(
      'mdl-tabs mdl-js-tabs', {
        'mdl-js-ripple-effect': this.props.ripple,
      }
    );

    const tabs = this.props.children.filter(child => child.type === Tab);
    const panels = this.props.children.filter(child => child.type === TabPanel);

    return (
      <div className={classes} ref={node => (this.root = node)}>
        <div className={cx('mdl-tabs__tab-bar', s.bar)}>
          {tabs.map((tab, i) => (
            <Tab
              key={i}
              isActive={i === this.state.activeTab}
              onClick={() => this.onTabClick(i)}
            >{tab.props.children}</Tab>
          ))}
        </div>
        {panels.map((panel, i) => (
          <TabPanel
            key={i}
            isActive={i === this.state.activeTab}
          >{panel.props.children}</TabPanel>
        ))}
      </div>
    );
  }
}

export { Tabs, Tab, TabPanel };
