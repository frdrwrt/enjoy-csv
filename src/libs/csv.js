import { createReadStream, createWriteStream } from 'fs';
import csv from 'fast-csv';
import utils from './utils.js';

export async function sniffCsvDelimiter(file) {
  const readstream = createReadStream(file, { encoding: 'utf-8' });
  for await (const chunk of readstream) {
    const posOfLineBreak = chunk.indexOf('\n');
    const header = chunk.slice(0, posOfLineBreak);

    const delimiters = [',', ';', '|', '^', '$', '\t'];
    for (const delimiter of delimiters) {
      if (header.includes(delimiter)) {
        return delimiter;
      }
    }
    break;
  }

  console.warn(`
⚠️ CSV delimiter could not be determined.
Either it is only one column, or the delimiter is not supported(,;|^$\\t).
Trying to read it with ; as delimiter.`);
  return ';';
}

export async function processCsv(
  { inputFilePath, outputFilePath },
  transformation,
  { outputHeaders = true } = {}
) {
  const delimiter = await sniffCsvDelimiter(inputFilePath);
  let idx = 1;

  await utils.pipeline(
    csv.parseFile(inputFilePath, { headers: true, delimiter }),
    async function* applyTransformation(asyncIterable) {
      for await (const row of asyncIterable) {
        idx += 1;
        try {
          yield transformation(row);
        } catch (error) {
          utils.skipRow(idx, error);
        }
      }
    },
    csv.format({ headers: outputHeaders, delimiter }),
    createWriteStream(outputFilePath)
  );
}

/*
 *  This is storing all rows in memory and should only be used for
 *  for small files. E.g in tests
 */
export async function readCsv(filePath) {
  const data = [];
  const delimiter = await sniffCsvDelimiter(filePath);
  await utils.pipeline(
    csv.parseFile(filePath, { headers: true, delimiter }),
    async function* collectRows(asyncIterable) {
      for await (const row of asyncIterable) {
        data.push(row);
      }
    }
  );
  return data;
}
