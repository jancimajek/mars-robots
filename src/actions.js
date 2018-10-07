import * as types from './actionTypes';

export const initMap = (x, y) => ({ type: types.INIT_MAP, x, y });

const headings = {
  N: 0, E: 90, S: 180, W: 270,
};
const getOrientation = heading => headings[heading];

export const placeRobot = (x, y, heading) => ({
  type: types.PLACE_ROBOT, x, y, orientation: getOrientation(heading),
});
