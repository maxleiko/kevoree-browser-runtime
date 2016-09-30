import React from 'react';
import cx from 'classnames';
import s from './styles.css';

const truncate = (str, length) => {
  let res = str || '';

  if (res.length >= length) {
    res = `${res.substr(0, length - 1)}.`;
  } else {
    let spaces = '';
    for (let i = 0; i < length - str.length; i++) {
      spaces += ' ';
    }
    res += spaces;
  }

  return res;
};

const getTime = time => {
  const t = new Date(time);
  const hours = (t.getHours().toString().length === 1) ?
    `0${t.getHours()}` : t.getHours();
  const mins = (t.getMinutes().toString().length === 1) ?
    `0${t.getMinutes()}` : t.getMinutes();
  const secs = (t.getSeconds().toString().length === 1) ?
    `0${t.getSeconds()}` : t.getSeconds();
  return `${hours}:${mins}:${secs}`;
};

const htmlify = content => {
  if (content) {
    return content.replace(new RegExp(/\n/, 'g'), '<br/>&nbsp;&nbsp;');
  }
  return '';
};

class Line extends React.Component {

  static propTypes = {
    time: React.PropTypes.number,
    level: React.PropTypes.string,
    tag: React.PropTypes.string,
    message: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }

  onMouseOver = () => {
    this.setState({ hovered: true });
  }

  onMouseOut = () => {
    this.setState({ hovered: false });
  }

  render() {
    const classes = cx(
      s.line,
      s[this.props.level],
      this.state.hovered && s[`hover${this.props.level}`],
    );

    return (
      <div
        className={classes}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className={s.time}>{getTime(this.props.time)}</div>
        <div className={s.tag}>{truncate(this.props.tag, 20)}</div>
        <div
          className={s.message}
          dangerouslySetInnerHTML={{ __html: htmlify(this.props.message) }}
        />
      </div>
    );
  }
}

export default Line;
