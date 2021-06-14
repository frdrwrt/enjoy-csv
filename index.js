import chalk from 'chalk';
import {
  checkNodeVersion,
  startEnjoyCsv,
  processArguments,
  somethingWentWrong,
} from './src/libs/cli.js';
import { processCsv } from './src/libs/csv.js';
import { foodsoftHeaders } from './src/libs/foodsoft.js';
import bode from './src/modes/bode.js';
import demo from './src/modes/demo.js';

async function enjoy(args) {
  startEnjoyCsv();
  console.log(chalk.blue(`MODE: ${args.mode}`));
  console.log(`⏳ Processing! Just wait a sec ...`);

  switch (args.mode) {
    case 'demo':
      await processCsv(args, demo);
      break;
    case 'bode':
      await processCsv(args, bode, { outputHeaders: foodsoftHeaders });
      break;
    default:
      somethingWentWrong(`
Mode ${args.mode} is not available!
Available modes: demo`);
  }

  console.log(`✅ Done!`);
}

checkNodeVersion();
const args = processArguments(process.argv);

await enjoy(args);
