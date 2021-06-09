import { describe, expect, test } from '@jest/globals';
import origin from './origin';

describe('origin and producer', () => {
  test('should convert columns origin and producer correctly', () => {
    expect(
      origin({
        Bestellnummer: 1,
        Ursprünge: 'Österreich, Deutschland',
        Marke: 'Bode Naturkost',
      })
    ).toEqual({
      Bestellnummer: 1,
      Produzent: 'Bode Naturkost',
      Herkunft: 'Österreich, Deutschland',
    });
  });

  test('should convert empty columns as undefined', () => {
    expect(
      origin({ Bestellnummer: 1, Ursprünge: '', Marke: 'Zwergenwiese' })
    ).toEqual({
      Bestellnummer: 1,
      Produzent: 'Zwergenwiese',
      Herkunft: undefined,
    });
  });

  test('should convert undefined columns as undefined', () => {
    expect(
      origin({ Bestellnummer: 1, Ursprünge: undefined, Marke: 'Zwergenwiese' })
    ).toEqual({
      Bestellnummer: 1,
      Produzent: 'Zwergenwiese',
      Herkunft: undefined,
    });
  });
});
