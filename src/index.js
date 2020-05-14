import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import App from './App';
import rootReducer from './slices';
import Home from './components/Home';
import Favorites from './components/favorites';

const store = configureStore({ reducer: rootReducer })

render((
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </App>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
