import logger from '../logger';

afterEach(() => {
  jest.clearAllMocks();
});

describe('logger middleware', () => {
  const expectedResult = { type: 'TEST_RESULT' };
  const expectedState = { state: 'TEST_STATE' };
  const create = () => {
    const store = {
      getState: jest.fn(() => expectedState),
      dispatch: jest.fn(),
    };
    const next = jest.fn(() => expectedResult);
    const invoke = action => logger(store)(next)(action);
    return { store, next, invoke };
  };

  it('should pass through action to the next dispatch handler', () => {
    const { next, invoke } = create();

    const action = { type: 'TEST' };
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });
});
