import { fileSync } from 'tmp';
import { join } from 'path';
import { sniffCsvDelimiter, readCsv, processCsv } from './csv';

const getFixture = (name) => join('src/libs/fixtures', name);

describe('csv sniffer', () => {
  test('should work with one column', async () => {
    expect(await sniffCsvDelimiter(getFixture('oneColumn.csv'))).toEqual(';');
  });

  test('should work with carrot ^', async () => {
    expect(await sniffCsvDelimiter(getFixture('carrot.csv'))).toEqual('^');
  });

  test('should work with semicolon ;', async () => {
    expect(await sniffCsvDelimiter(getFixture('semicolon.csv'))).toEqual(';');
  });

  test('should work with pipe |', async () => {
    expect(await sniffCsvDelimiter(getFixture('pipe.csv'))).toEqual('|');
  });
});

describe('processCsv', () => {
  let outputFile;
  beforeEach(async () => {
    outputFile = fileSync();
  });

  afterEach(async () => {
    outputFile.removeCallback();
  });

  test('should process csv successful', async () => {
    await processCsv(
      {
        inputFilePath: getFixture('testCsv.csv'),
        outputFilePath: outputFile.name,
      },
      (row) => ({
        ...row,
        name: row.name?.trim(),
      })
    );

    const output = await readCsv(outputFile.name);

    expect(output).toEqual([
      { id: '1', name: 'test', price: '1.12' },
      { id: '2', name: 'more', price: '' },
      { id: '3', name: 'yo', price: '0' },
    ]);
  });
});
