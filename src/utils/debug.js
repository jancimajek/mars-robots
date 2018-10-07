import debug from 'debug';

export default function (moduleParam, prefixParam = null) {
  const prefix = prefixParam || process.env.APP_NAME || 'app';
  const colon = moduleParam && moduleParam !== '*' ? ':' : '';
  const module = moduleParam || '';
  return debug(`${prefix}${colon}${module}`);
}
