import debug from './utils/debug';

import * as types from './actionTypes';
import { ROTATION_ANGLE } from './constants';
import { isOffMap, hasScent } from './selectors';

import { getHeading, getOrientation } from './utils/orientation';
import { sind, cosd } from './utils/math';


export const initMap = (x, y) => ({ type: types.INIT_MAP, x, y });

export const addScent = (x, y) => ({ type: types.ADD_SCENT, x, y });

export const addOutput = (x, y, orientation, lost) => ({
  type: types.ADD_OUTPUT, x, y, heading: getHeading(orientation), lost,
});

export const placeRobot = (x, y, heading) => ({
  type: types.PLACE_ROBOT, x, y, orientation: getOrientation(heading),
});
export const turnRobot = orientation => ({ type: types.TURN_ROBOT, orientation });
export const moveRobot = (x, y) => ({ type: types.MOVE_ROBOT, x, y });
export const killRobot = () => ({ type: types.KILL_ROBOT });

export const moveRobotForward = () => (dispatch, getState) => {
  const state = getState();
  const { x, y, orientation } = state.robot;

  const newx = x + Math.round(sind(orientation));
  const newy = y + Math.round(cosd(orientation));

  if (isOffMap(newx, newy)(state)) {
    if (!hasScent(x, y)(state)) {
      dispatch(addScent(x, y));
      dispatch(killRobot());
    } else {
      debug('danger')('Danger, Will Robinson!');
    }
  } else {
    dispatch(moveRobot(newx, newy));
  }
};

export const processInstructions = instructions => (dispatch, getState) => {
  const { robot } = getState();
  const {
    x, y, orientation, lost,
  } = robot;

  if (lost || instructions.length === 0) {
    dispatch(addOutput(x, y, orientation, lost));
    return;
  }

  const instruction = instructions[0];
  debug('instruction')('%o', instruction);

  switch (instruction) {
    case 'R':
      dispatch(turnRobot((orientation + ROTATION_ANGLE) % 360));
      break;
    case 'L':
      dispatch(turnRobot((orientation + 360 - ROTATION_ANGLE) % 360));
      break;
    case 'F':
      dispatch(moveRobotForward());
      break;
    default:
      break;
  }

  dispatch(processInstructions(instructions.slice(1)));
};
