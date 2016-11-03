import React from 'react';
import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

class Index extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  render() {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" size="small"
          pad={{horizontal: 'medium'}} colorIndex="grey-1">
          <Title>Kevoree Browser Runtime</Title>
        </Header>
        <Box>
          {this.props.children}
        </Box>
      </App>
    );
  }
}

export default Index;
