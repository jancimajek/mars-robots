import * as actions from '../actions';
import * as types from '../actionTypes';

describe('actions', () => {
  it('action', () => {
    const data = { a: [1, 2], s: 'test', i: 1 };
    const expectedAction = { type: types.ACTION, data };
    expect(actions.action(data)).toEqual(expectedAction);
  });
});
