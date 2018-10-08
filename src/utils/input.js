import readline from 'readline';
import fs from 'fs';
import debug from './debug';

export const processFileInput = filename => (lineProcessor) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filename, 'utf8'),
    crlfDelay: Infinity,
  });

  let ln = 0;
  rl.on('line', (line) => {
    const [noComments] = line.split('#');
    const l = noComments.trim();

    // Ignore blank lines
    if (l === '') return;

    debug('input')('%o', l);
    lineProcessor(l, ln++);
  });

  rl.on('close', () => {
    debug('input')('<EOF>');
  });
};
