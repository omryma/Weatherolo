import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';

const App = (props) => {
  const { children } = props

  return (
    <Container>
      <NavBar />
      {children}
    </Container>
  )
}

export default withRouter(App);
