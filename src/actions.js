import * as types from './actionTypes';
import { getOrientation } from './utils/orientation';


export const initMap = (x, y) => ({ type: types.INIT_MAP, x, y });

export const placeRobot = (x, y, heading) => ({
  type: types.PLACE_ROBOT, x, y, orientation: getOrientation(heading),
});
export const turnRobot = orientation => ({ type: types.TURN_ROBOT, orientation });
