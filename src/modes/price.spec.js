import { describe, expect, test } from '@jest/globals';
import price from './price';

describe('price', () => {
  // using the webshop, we get 2% discount applied to 'Listenpreis'
  test('should calculate the price for 25*1kg rice correctly', () => {
    expect(
      price({
        Bestellnummer: 20421,
        Listenpreis: 1.95,
      })
    ).toEqual({ Bestellnummer: 20421, Nettopreis: 1.91 });
  });

  test('should calculate the price for 6*0,5kg rice correctly', () => {
    expect(
      price({
        Bestellnummer: 40444,
        Listenpreis: 1.55,
      })
    ).toEqual({ Bestellnummer: 40444, Nettopreis: 1.52 });
  });

  test('should calculate the price for 25*1kg almond correctly', () => {
    expect({
      Bestellnummer: 22414,
      Listenpreis: 14.19,
    }).toEqual({ Bestellnummer: 22414, Nettopreis: 13.9 });
  });

  test('should calculate the price for 12*1L soja drink correctly', () => {
    expect({
      Bestellnummer: 12101,
      Listenpreis: 1.39,
    }).toEqual({ Bestellnummer: 12101, Nettopreis: 1.36 });
  });
});
