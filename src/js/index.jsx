import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import '../sass/app.scss';

import reducers from './rootReducer';
import routes from './routes';

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={createStoreWithMiddleware(reducers)}>
			<Router history={browserHistory} routes={routes} />
		</Provider>
	</MuiThemeProvider>
  , document.querySelector('.container'));
