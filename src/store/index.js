import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import messagesReducer from './messages';

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})));

const store = createStore(messagesReducer, middleware);

export default store;
export * from './messages';
