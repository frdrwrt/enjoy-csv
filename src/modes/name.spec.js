import { describe, expect, test } from '@jest/globals';
import name from './name';

describe('name', () => {
  test('should expand article name of kolli-artikel with bulk size', () => {
    expect(
      name({
        Bestellnummer: 1,
        Artikelname: 'Langkornreis Vollkorn bio',
        Kolli_Artikel: 'Ja',
        Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
      })
    ).toEqual({
      Bestellnummer: 1,
      Name: 'Langkornreis Vollkorn bio 25kg Gebinde',
    });
  });

  test('should limit maximum number of characters for article name to 60', () => {
    expect(
      name({
        Bestellnummer: 1,
        Artikelname:
          'Langkornreis Vollkorn bio und all das sollte noch mit zählen   aber das hier nicht mehr',
      })
    ).toEqual({
      Bestellnummer: 1,
      Name: 'Langkornreis Vollkorn bio und all das sollte noch mit zählen',
    });
  });

  // another important case need to be tested but therefor we need to change the test setup:
  // name needs to be unique!
});
