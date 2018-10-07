import debug from 'debug';
import _debug from '../debug';

jest.mock('debug', () => jest.fn(
  () => () => {},
));

afterEach(() => {
  jest.clearAllMocks();
});

describe('debug', () => {
  it('should return a function', () => {
    expect(typeof _debug()).toBe('function');
  });

  it('should use just default prefix when called with no params', () => {
    _debug();
    expect(debug).toBeCalledWith('app');
  });

  it('should add start to prefix if parameter is star only', () => {
    _debug('*');
    expect(debug).toBeCalledWith('app*');
  });

  it('should set provided module with default prefix when not provided', () => {
    _debug('module');
    expect(debug).toBeCalledWith('app:module');
  });

  it('should set provided module with app name as prefix when app name is set and prefix is not provided', () => {
    process.env.APP_NAME = 'test';
    _debug('module');
    expect(debug).toBeCalledWith('test:module');
  });

  it('should set provided prefix and module', () => {
    _debug('module', 'prefix');
    expect(debug).toBeCalledWith('prefix:module');
  });
});
