
import debug from '../utils/debug';

const logger = ({ getState }) => next => (action) => {
  debug('dispatch')('%o', action);
  const result = next(action);
  debug('state')('%O', getState());
  return result;
};

export default logger;
