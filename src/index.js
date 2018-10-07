import { createStore } from 'redux';
import readline from 'readline';
import fs from 'fs';
import { initMap } from './actions';
import reducer from './reducer';
import debug from './utils/debug';

process.env.APP_NAME = process.env.APP_NAME || 'robots';
const store = createStore(reducer);
debug('*')(store);

const { dispatch, getState } = store;
dispatch(initMap(1, 2));
debug('state')(getState());

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
