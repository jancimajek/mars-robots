import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import logger from './middleware/logger';
import { initMap, placeRobot, processInstructions } from './actions';
import { processFileInput } from './utils/input';

process.env.APP_NAME = process.env.APP_NAME || 'robots';
const inputFile = process.env.INPUT_FILE || 'input.txt';

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

(async ({ dispatch }) => {
  await processFileInput(inputFile)((line, ln) => {
    if (ln === 0) {
      const [x, y] = line.split(' ');
      dispatch(initMap(
        parseInt(x, 10),
        parseInt(y, 10),
      ));
    } else if (ln % 2 === 1) {
      const [x, y, heading] = line.split(' ');
      dispatch(placeRobot(
        parseInt(x, 10),
        parseInt(y, 10),
        heading,
      ));
    } else {
      dispatch(processInstructions(line.split('')));
    }
  });

  store.getState().output.forEach(({
    x, y, heading, lost,
  }) => {
    console.log(`${x} ${y} ${heading} ${lost ? 'LOST' : ''}`); // eslint-disable-line no-console
  });
})(store);
