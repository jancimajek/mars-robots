
import debug from '../utils/debug';

const logger = () => next => (action) => {
  debug('dispatch')('%o', action);
  return next(action);
};

export default logger;
