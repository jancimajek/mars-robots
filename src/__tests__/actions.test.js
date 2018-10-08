import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions';
import * as types from '../actionTypes';
import { getHeading, getOrientation } from '../utils/orientation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('initMap', () => {
    const [x, y] = [1, 2];
    const expectedAction = { type: types.INIT_MAP, x, y };
    expect(actions.initMap(x, y)).toEqual(expectedAction);
  });

  it('addScent', () => {
    const [x, y] = [1, 2];
    const expectedAction = { type: types.ADD_SCENT, x, y };
    expect(actions.addScent(x, y)).toEqual(expectedAction);
  });

  it('addOutput', () => {
    const [x, y, heading, lost] = [1, 2, 'E', true];
    const expectedAction = {
      type: types.ADD_OUTPUT, x, y, heading, lost,
    };
    const action = actions.addOutput(x, y, getOrientation(heading), lost);
    expect(action).toEqual(expectedAction);
  });

  it('placeRobot', () => {
    const [x, y, orientation] = [1, 2, 180];
    const expectedAction = {
      type: types.PLACE_ROBOT, x, y, orientation,
    };
    const action = actions.placeRobot(x, y, getHeading(orientation));
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

  it('killRobot', () => {
    const expectedAction = { type: types.KILL_ROBOT };
    expect(actions.killRobot()).toEqual(expectedAction);
  });

  // TODO: mock selectors
  describe('moveRobotForward', () => {
    it.each([
      [0, 1, 2],
      [90, 2, 1],
      [180, 1, 0],
      [270, 0, 1],
    ])(
      'should move robot in correct direction when facing %i degrees',
      async (orientation, expectedX, expectedY) => {
        const initialState = {
          map: { x: 2, y: 2 },
          robot: {
            x: 1, y: 1, orientation, lost: false,
          },
        };

        const store = mockStore(initialState);
        await store.dispatch(actions.moveRobotForward());

        const dispatchedActions = store.getActions();
        const expectedAction = actions.moveRobot(expectedX, expectedY);
        expect(dispatchedActions).toEqual([expectedAction]);
      },
    );

    it.each([
      0, 90, 180, 270,
    ])('should kill robot and add scent when it goes off the map facing %i degrees', async (orientation) => {
      const initialState = {
        map: { x: 0, y: 0 },
        scents: {},
        robot: {
          x: 0, y: 0, orientation, lost: false,
        },
      };

      const store = mockStore(initialState);
      await store.dispatch(actions.moveRobotForward());

      const dispatchedActions = store.getActions();
      const expectedActions = [
        actions.addScent(0, 0),
        actions.killRobot(),
      ];
      expect(dispatchedActions).toEqual(expectedActions);
    });

    it.each([
      0, 90, 180, 270,
    ])('should do nothing when the position has scent and robot tries to go off the map (facing %i degrees)',
      async (orientation) => {
        const initialState = {
          map: { x: 0, y: 0 },
          scents: { 0: { 0: true } },
          robot: {
            x: 0, y: 0, orientation, lost: false,
          },
        };

        const store = mockStore(initialState);
        await store.dispatch(actions.moveRobotForward());

        const dispatchedActions = store.getActions();
        const expectedActions = [];
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  // TODO: add more tests
  describe('processInstructions', () => {
    it('should add output if no instructions left', async () => {
      const [x, y, orientation, lost] = [1, 2, 90, false];
      const initialState = {
        robot: {
          x, y, orientation, lost,
        },
      };

      const store = mockStore(initialState);
      await store.dispatch(actions.processInstructions([]));

      const dispatchedActions = store.getActions();
      const expectedAction = actions.addOutput(x, y, orientation, lost);
      expect(dispatchedActions).toEqual([expectedAction]);
    });

    it('should add output if robot has been lost', async () => {
      const [x, y, orientation, lost] = [1, 2, 90, true];
      const initialState = {
        robot: {
          x, y, orientation, lost,
        },
      };

      const store = mockStore(initialState);
      await store.dispatch(actions.processInstructions(['R', 'F', 'L']));

      const dispatchedActions = store.getActions();
      const expectedAction = actions.addOutput(x, y, orientation, lost);
      expect(dispatchedActions).toEqual([expectedAction]);
    });
  });
});
