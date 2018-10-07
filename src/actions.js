import * as types from './actionTypes';

export const initMap = (x, y) => ({ type: types.INIT_MAP, x, y });

export const placeRobot = (x, y, heading) => ({
  type: types.PLACE_ROBOT, x, y, heading,
});
