import React from 'react';
import { connect } from 'react-redux';
import { Header, HeaderRow, Navigation } from 'react-mdl/lib/Layout';
import Link from '../Link';
import s from './Header.css';
import HeaderTitle from './HeaderTitle';

const CustomHeader = ({ route }) => (
  <Header className={s.header}>
    <HeaderRow className={s.row} title={<HeaderTitle />}>
      <Navigation>
        <Link
          to="/"
          isActive={route === '/' || route === '/runtime' || route === '/bootstrap'}
        >Home</Link>
        <Link
          to="/about"
          isActive={route === '/about'}
        >About</Link>
        <Link
          to="/settings"
          isActive={route === '/settings'}
        >Settings</Link>
      </Navigation>
    </HeaderRow>
  </Header>
);

CustomHeader.propTypes = {
  route: React.PropTypes.string,
};

export default connect(
  (state) => ({
    route: state.main.route,
  }),
  {}
)(CustomHeader);
