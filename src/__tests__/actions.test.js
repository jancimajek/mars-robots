import * as actions from '../actions';
import * as types from '../actionTypes';

describe('actions', () => {
  it('initMap', () => {
    const [x, y] = [1, 2];
    const expectedAction = { type: types.INIT_MAP, x, y };
    expect(actions.initMap(x, y)).toEqual(expectedAction);
  });

  it('placeRobot', () => {
    const [x, y, orientation] = [1, 2, 180];
    const expectedAction = {
      type: types.PLACE_ROBOT, x, y, orientation,
    };
    const action = actions.placeRobot(x, y, 'S');
    expect(action).toEqual(expectedAction);
  });

  it('turnRobot', () => {
    const orientation = 270;
    const expectedAction = { type: types.TURN_ROBOT, orientation };
    expect(actions.turnRobot(orientation)).toEqual(expectedAction);
  });

  it('moveRobot', () => {
    const [x, y] = [1, 2];
    const expectedAction = { type: types.MOVE_ROBOT, x, y };
    expect(actions.moveRobot(x, y)).toEqual(expectedAction);
  });
});
