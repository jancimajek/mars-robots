import * as actions from '../actions';
import * as types from '../actionTypes';

describe('actions', () => {
  it('initMap', () => {
    const [x, y] = [1, 2];
    const expectedAction = { type: types.INIT_MAP, x, y };
    expect(actions.initMap(x, y)).toEqual(expectedAction);
  });

  it('placeRobot', () => {
    const [x, y, heading] = [1, 2, 'E'];
    const expectedAction = {
      type: types.PLACE_ROBOT, x, y, heading,
    };
    const action = actions.placeRobot(x, y, heading);
    expect(action).toEqual(expectedAction);
  });
});
