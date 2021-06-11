import { describe, expect, test } from '@jest/globals';
import price from './price';

describe('price - unit is kg', () => {
  // using the webshop, we get 2% discount applied to 'Listenpreis'
  // I use `Nettofüllmenge_od_Mengendangabe_2` to be more consistent over the modules: only Bestellnummer is named as we need it in foodsoft,
  // the rest belongs to columns coming from bode. Alternatively we could use `Gebindegröße` as this is the relevant information to calculate the price!

  test('should calculate the price for 25*1kg rice correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 20421,
          Listenpreis: 1.95,
          Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 20421, Nettopreis: 1.91 });
  });
  test('should calculate the price for 25*1kg almond correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 22414,
          Listenpreis: 14.19,
          Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 22414, Nettopreis: 13.9 });
  });

  test('should calculate the price for 25*0.5kg correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 5.52,
          Nettofüllmenge_od_Mengenangabe_2: '12.500 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 2.7 });
  });

  test('should calculate the price for 12*250g "Aufstrich" correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 4.99,
          Nettofüllmenge_od_Mengenangabe_2: '3.000 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 1.22 });
  });

  test('should calculate the price for 25*100g "Kuvertüre" correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 8.99,
          Nettofüllmenge_od_Mengenangabe_2: '2.500 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 0.88 });
  });

  test('should calculate the price for 20*50g "Trockenhefe" correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 14.45,
          Nettofüllmenge_od_Mengenangabe_2: '1.000 kg',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 0.71 });
  });
});

describe('price - unit is L', () => {
  test('should calculate the price for 12*1L soja drink correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 12101,
          Listenpreis: 1.39,
          Nettofüllmenge_od_Mengenangabe_2: '12.000 Liter',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 12101, Nettopreis: 1.36 });
  });

  test('should calculate the price for 10*0.5L whatever correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 5.0,
          Nettofüllmenge_od_Mengenangabe_2: '5.000 Liter',
        },
        0.0
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 2.5 });
  });
});

describe('price - unit is other than kg or L', () => {
  test('should calculate the price for 6 packs á 500g rice correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 40444,
          Listenpreis: 1.55,
          Nettofüllmenge_od_Mengenangabe_2: '6.000 Beutel',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 40444, Nettopreis: 1.52 });
  });

  test('should calculate the price for 15 packs "soja sahne" correctly', () => {
    expect(
      price(
        {
          Bestellnummer: 1,
          Listenpreis: 0.85,
          Nettofüllmenge_od_Mengenangabe_2: '15.000 Packung',
        },
        0.02
      )
    ).toEqual({ Bestellnummer: 1, Nettopreis: 0.83 });
  });
});
