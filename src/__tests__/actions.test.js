import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as types from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

  it('moveRobotForward', async () => {
    const initialState = {
      map: { x: 2, y: 2 },
      robot: {
        x: 1, y: 1, orientation: 0,
      },
    };

    const store = mockStore(initialState);
    await store.dispatch(actions.moveRobotForward());

    const dispatchedActions = store.getActions();
    const expectedAction = actions.moveRobot(1, 2);
    expect(dispatchedActions).toEqual([expectedAction]);
  });
});
