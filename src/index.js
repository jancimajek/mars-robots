import { createStore, applyMiddleware } from 'redux';
import readline from 'readline';
import fs from 'fs';
import thunk from 'redux-thunk';
import { initMap, placeRobot, processInstructions } from './actions';
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
dispatch(initMap(5, 3));
dispatch(placeRobot(1, 1, 'E'));
dispatch(processInstructions(['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F']));
dispatch(placeRobot(3, 2, 'N'));
dispatch(processInstructions(['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L']));
dispatch(placeRobot(0, 3, 'W'));
dispatch(processInstructions(['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L']));

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
