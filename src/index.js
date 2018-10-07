import { createStore, applyMiddleware } from 'redux';
import readline from 'readline';
import fs from 'fs';
import thunk from 'redux-thunk';
import {
  initMap, placeRobot, turnRobot, moveRobotForward,
} from './actions';
import reducer from './reducer';
import logger from './middleware/logger';
import debug from './utils/debug';

process.env.APP_NAME = process.env.APP_NAME || 'robots';
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);
debug('*')(store);

const { dispatch, getState } = store;
debug('state')(getState());
dispatch(initMap(1, 2));
dispatch(placeRobot(0, 1, 'W'));
dispatch(turnRobot(0));
dispatch(moveRobotForward());
dispatch(turnRobot(90));
dispatch(moveRobotForward());

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt', 'utf8'),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  const [noComments] = line.split('#');
  const l = noComments.trim();

  // Ignore blank lines
  if (l === '') return;

  debug('input')('%o', l);
});

rl.on('close', () => {
  debug('input')('<EOF>');
});
