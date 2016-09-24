import React from 'react';
import { connect } from 'react-redux';
import history from '../../core/history';

class HomePage extends React.Component {
  static propTypes = {
    bootstrapState: React.PropTypes.oneOf(['init', 'done', 'inProgress', 'error']),
  };

  componentDidMount() {
    document.title = 'Home - Kevoree Browser Runtime';
    if (this.props.bootstrapState === 'done') {
      history.push('/runtime');
    } else {
      history.push('/bootstrap');
    }
  }

  render() {
    // ignore rendering
    return null;
  }
}

export default connect(
  (state) => ({
    bootstrapState: state.bootstrap.state,
  }),
  {},
)(HomePage);
