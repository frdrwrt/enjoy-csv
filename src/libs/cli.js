import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import clear from 'clear';
import figlet from 'figlet';
import chalk from 'chalk';

export function checkNodeVersion() {
  const nodeVersion = process.versions.node;
  const majorVersion = nodeVersion.split('.')[0];
  const minorVersion = nodeVersion.split('.')[1];
  console.log(`Node Version ${nodeVersion}`);
  if (majorVersion < 14 || (majorVersion === 14 && minorVersion < 15)) {
    throw Error(
      'Node version needs to be at least v14.15 Use nvm to change it!'
    );
  }
}

export function startEnjoyCsv() {
  clear();
  console.log(
    chalk.yellow(figlet.textSync('Enjoy CSV', { horizontalLayout: 'full' }))
  );
}

export function somethingWentWrong(msg) {
  console.log(
    chalk.redBright(`
🚨 Something went wrong!
${msg}
`)
  );
  process.exit(1);
}
export function processArguments(argv) {
  const mode = argv[2];
  const inputFilePath = argv[3];
  const outputFilePath = argv[4];

  if (!outputFilePath) {
    somethingWentWrong(`
USAGE: node index.js <mode> <inputPath> <outputPath>
e.g.: node index.js demo demo.csv output/demo.csv`);
  }

  if (!existsSync(inputFilePath)) {
    somethingWentWrong(`
InputFile does not exists ${inputFilePath}`);
  }

  const outputDir = dirname(outputFilePath);
  mkdirSync(outputDir, { recursive: true });

  return {
    mode,
    inputFilePath,
    outputFilePath,
  };
}
