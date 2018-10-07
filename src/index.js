import { createStore } from 'redux';
import reducer from './reducer';
import debug from './utils/debug';

process.env.APP_NAME = process.env.APP_NAME || 'app';
const store = createStore(reducer);
debug('*')(store);
