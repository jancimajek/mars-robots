import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import logger from './middleware/logger';
import { initMap, placeRobot, processInstructions } from './actions';
import { processFileInput } from './utils/input';
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

processFileInput('input.txt')((line, ln) => {
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
