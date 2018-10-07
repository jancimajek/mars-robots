import reducer from '../reducer';
import * as types from '../actionTypes';

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      map: { x: 0, y: 0, scents: {} },
      robot: {},
      output: [],
    });
  });

  describe('ACTION', () => {
    it('should handle ACTION', () => {
      const data = { a: [1, 2], s: 'test', i: 1 };
      const rest = {};

      const state = { rest };
      const action = { type: types.ACTION, data };
      const expectedState = { rest, data };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });
});
