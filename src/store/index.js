import { createStore, combineReducers } from 'redux';
import { countReducer } from './countReducer';
import { textReducer } from './textReducer';

const rootReducer = combineReducers({ countReducer, textReducer });

export const store = createStore(rootReducer);
