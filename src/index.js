import debug from './utils/debug';
import { hello } from './hello';

process.env.APP_NAME = process.env.APP_NAME || 'app';
debug('*')(hello('world!'));
debug('debug')(hello('debug!'));
