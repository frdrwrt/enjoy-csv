import { promisify } from 'util';
import { pipeline as syncPipeline } from 'stream';
import chalk from 'chalk';

const pipeline = promisify(syncPipeline);

const skipRow = (idx, msg) => {
  console.log(chalk.blue(`⚠️ Row ${idx} skipped: `) + msg);
};

export default {
  pipeline,
  skipRow,
};
