import * as types from './actionTypes';
import { getOrientation } from './utils/orientation';
import { sind, cosd } from './utils/math';


export const initMap = (x, y) => ({ type: types.INIT_MAP, x, y });

export const placeRobot = (x, y, heading) => ({
  type: types.PLACE_ROBOT, x, y, orientation: getOrientation(heading),
});
export const turnRobot = orientation => ({ type: types.TURN_ROBOT, orientation });
export const moveRobot = (x, y) => ({ type: types.MOVE_ROBOT, x, y });


export const moveRobotForward = () => (dispatch, getState) => {
  const state = getState();
  const { x, y, orientation } = state.robot;

  const newx = x + Math.round(sind(orientation));
  const newy = y + Math.round(cosd(orientation));

  dispatch(moveRobot(newx, newy));
};
