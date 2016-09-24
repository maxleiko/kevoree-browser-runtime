import React from 'react';
import { connect } from 'react-redux';
import s from './Header.css';
import Link from '../Link';

const HeaderTitle = ({ version }) => (
  <Link to="/" className={s.title}>
    <span>Kevoree Browser Runtime</span>
    <span className={s.version}>&nbsp;v{version}</span>
  </Link>
);

HeaderTitle.propTypes = {
  version: React.PropTypes.string,
};

export default connect(
  (state) => ({ ...state.main }),
  {}
)(HeaderTitle);
