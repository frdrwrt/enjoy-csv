import { describe, expect, test } from '@jest/globals';
import tax from './tax';

describe('identify tax', () => {
  test('should identify full tax rate', () => {
    expect(
      tax({ Bestellnummer: 1, MwSt_Deutschland: 'Voller MWSt-Satz' })
    ).toEqual({
      Bestellnummer: 1,
      Mwst: '19.00%',
    });
  });

  test('should identify half tax rate', () => {
    expect(
      tax({ Bestellnummer: 1, MwSt_Deutschland: 'Halber MWSt-Satz' })
    ).toEqual({
      Bestellnummer: 1,
      Mwst: '7.00%',
    });
  });

  test('should identify full tax rate independent on capitalization', () => {
    expect(
      tax({ Bestellnummer: 1, MwSt_Deutschland: 'Voller Mwst-satz' })
    ).toEqual({
      Bestellnummer: 1,
      Mwst: '19.00%',
    });
  });

  test('should identify half tax rate independent on capitalization', () => {
    expect(
      tax({ Bestellnummer: 1, MwSt_Deutschland: 'halber Mwst-sAtz' })
    ).toEqual({
      Bestellnummer: 1,
      Mwst: '7.00%',
    });
  });
});
