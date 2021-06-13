import { describe, expect, test, afterEach } from '@jest/globals';
import bode, { resetNameMemory } from './bode';

afterEach(() => {
  resetNameMemory();
});

const fakeData = {
  Artikelnr: 1,
  Artikelname: 'Sendi Aufstrich',
  Marke: 'Zwergenwiese',
  MwSt_Deutschland: 'Halber MwSt-Satz',
  Produktgruppe: 'Aufstriche',
  Untergruppe: 'Aufstriche würzig',
  Kolli_Artikel: 'Nein',
  Kondition_auf: 'kg',
  Nettofüllmenge_od_Mengenangabe_2: '25kg',
  Ursprünge: 'Deutschland',
  Listenpreis: 1.85,
};

describe('bode naturkost', () => {
  test('should extract information from bode to format as expected by foodsoft', () => {
    expect(bode(fakeData)).toMatchObject({
      Bestellnummer: 1,
      Name: 'Sendi Aufstrich',
      Produzent: 'Zwergenwiese',
      Herkunft: 'Deutschland',
      Einheit: '1 kg',
      Nettopreis: 1.81,
      Mwst: '7.00%',
      Gebindegröße: 25,
      Kategorie: 'Aufstriche würzig',
    });
  });
});

describe('category', () => {
  test('should rename order number and set category if secondary category is given', () => {
    expect(
      bode({
        ...fakeData,
        Produktgruppe: ' non alcoholic drinks  ',
        Untergruppe: 'milk-drinks',
      })
    ).toMatchObject({
      Kategorie: 'milk-drinks',
    });
  });

  test('should use primary category if secondary is empty and trim', () => {
    expect(
      bode({
        ...fakeData,
        Produktgruppe: ' non alcoholic drinks   ',
        Untergruppe: '    ',
      })
    ).toMatchObject({
      Kategorie: 'non alcoholic drinks',
    });
  });

  test('should use primary category if secondary is null and trim', () => {
    expect(
      bode({
        ...fakeData,
        Produktgruppe: ' non alcoholic drinks   ',
        Untergruppe: null,
      })
    ).toMatchObject({
      Kategorie: 'non alcoholic drinks',
    });
  });

  test('should throw error if Untergruppe and Produktgruppe is undefined', () => {
    expect(() =>
      bode({
        ...fakeData,
        Produktgruppe: undefined,
        Untergruppe: undefined,
      })
    ).toThrowError(
      'Kategorie could not be determined, because Untergruppe and Produktgruppe is undefined'
    );
  });
});

describe('name', () => {
  test('should expand article name of kolli-artikel with bulk size', () => {
    expect(
      bode({
        ...fakeData,
        Artikelname: 'Langkornreis Vollkorn bio',
        Kolli_Artikel: 'Ja',
        Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
      })
    ).toMatchObject({
      Name: 'Langkornreis Vollkorn bio 25.000 kg Gebinde',
    });
  });

  test('should limit maximum number of characters for article name to 60', () => {
    expect(
      bode({
        ...fakeData,
        Artikelname:
          'Langkornreis Vollkorn bio und all das sollte noch mit zählen   aber das hier nicht mehr',
      })
    ).toMatchObject({
      Name: 'Langkornreis Vollkorn bio und all das sollte noch mit zählen',
    });
  });

  test('should throw if name is not unique', () => {
    bode({ ...fakeData, Artikelname: 'Langkornreis' });
    expect(() =>
      bode({ ...fakeData, Artikelname: 'Langkornreis' })
    ).toThrowError('Name (Langkornreis) is not unique');
  });
});

describe('origin and producer', () => {
  test('should convert columns origin and producer correctly', () => {
    expect(
      bode({
        ...fakeData,
        Ursprünge: 'Österreich, Deutschland',
        Marke: 'Bode Naturkost',
      })
    ).toMatchObject({
      Produzent: 'Bode Naturkost',
      Herkunft: 'Österreich, Deutschland',
    });
  });
});

describe.skip('price', () => {
  describe('unit is kg', () => {
    test('should calculate the price for 25*1kg rice correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 1.95,
          Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
        })
      ).toMatchObject({ Nettopreis: 1.91 });
    });
    test('should calculate the price for 25*1kg almond correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 14.19,
          Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
        })
      ).toMatchObject({ Nettopreis: 13.91 });
    });

    test('should calculate the price for 25*0.5kg correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 5.52,
          Nettofüllmenge_od_Mengenangabe_2: '12.500 kg',
        })
      ).toMatchObject({ Nettopreis: 2.7 });
    });

    test('should calculate the price for 12*250g "Aufstrich" correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 4.99,
          Nettofüllmenge_od_Mengenangabe_2: '3.000 kg',
        })
      ).toMatchObject({ Nettopreis: 1.22 });
    });

    test('should calculate the price for 25*100g "Kuvertüre" correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 8.99,
          Nettofüllmenge_od_Mengenangabe_2: '2.500 kg',
        })
      ).toMatchObject({ Nettopreis: 0.88 });
    });

    test('should calculate the price for 20*50g "Trockenhefe" correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 14.45,
          Nettofüllmenge_od_Mengenangabe_2: '1.000 kg',
        })
      ).toMatchObject({ Nettopreis: 0.71 });
    });
  });

  describe('unit is L', () => {
    test('should calculate the price for 12*1L soja drink correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 1.39,
          Nettofüllmenge_od_Mengenangabe_2: '12.000 Liter',
        })
      ).toMatchObject({ Nettopreis: 1.36 });
    });

    test('should calculate the price for 10*0.5L whatever correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 5.0,
          Nettofüllmenge_od_Mengenangabe_2: '5.000 Liter',
        })
      ).toMatchObject({ Nettopreis: 2.5 });
    });
  });

  describe('unit is other than kg or L', () => {
    test.only('should calculate the price for 6 packs á 500g rice correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 1.55,
          Nettofüllmenge_od_Mengenangabe_2: '6.000 Beutel',
        })
      ).toMatchObject({ Nettopreis: 1.52 });
    });

    test('should calculate the price for 15 packs "soja sahne" correctly', () => {
      expect(
        bode({
          ...fakeData,
          Listenpreis: 0.85,
          Nettofüllmenge_od_Mengenangabe_2: '15.000 Packung',
        })
      ).toMatchObject({ Nettopreis: 0.83 });
    });
  });
});

describe('identify tax', () => {
  test('should identify full tax rate', () => {
    expect(
      bode({ ...fakeData, MwSt_Deutschland: 'Voller MWSt-Satz' })
    ).toMatchObject({
      Mwst: '19.00%',
    });
  });

  test('should identify half tax rate', () => {
    expect(
      bode({ ...fakeData, MwSt_Deutschland: 'Halber MWSt-Satz' })
    ).toMatchObject({
      Mwst: '7.00%',
    });
  });

  test('should identify full tax rate independent on capitalization', () => {
    expect(
      bode({ ...fakeData, MwSt_Deutschland: 'Voller Mwst-satz' })
    ).toMatchObject({
      Mwst: '19.00%',
    });
  });

  test('should identify half tax rate independent on capitalization', () => {
    expect(
      bode({ ...fakeData, MwSt_Deutschland: 'halber Mwst-sAtz' })
    ).toMatchObject({
      Mwst: '7.00%',
    });
  });

  test('should throw if tax could not be determined', () => {
    expect(() =>
      bode({ ...fakeData, MwSt_Deutschland: 'viertel Mwst-sAtz' })
    ).toThrowError('Tax could not be determined (viertel mwst-satz)');
  });

  test('should throw if tax is undefined', () => {
    expect(() =>
      bode({ ...fakeData, MwSt_Deutschland: undefined })
    ).toThrowError('Tax could not be determined (undefined)');
  });
});

describe('splitBulk', () => {
  describe('unit is 1 kg - number of units beginning from 15', () => {
    test('should split 15kg bulk size in 15 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '15.000 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 15,
      });
    });

    // let's ignore decimals of these rare unconventional bulk sizes according to the used unit (in this example 1kg)
    test('should split 19.96kg bulk size in 19 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '19.960 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 19,
      });
    });

    test('should split 20kg bulk size in 20 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '20.000 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 20,
      });
    });

    test('should split 25kg bulk size in 25 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 25,
      });
    });

    test('should split 25,5kg bulk size in 25 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '25.500 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 25,
      });
    });

    test('should split 400kg bulk size in 400 parts á 1kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '400.000 kg',
        })
      ).toMatchObject({
        Einheit: '1 kg',
        Gebindegröße: 400,
      });
    });
  });

  describe('unit is 0.5kg - number of units between 12 and 29', () => {
    test('should split 6kg bulk size in 12 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '6.000 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 12,
      });
    });

    test('should split 6,35kg bulk size in 12 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '6.350 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 12,
      });
    });

    test('should split 7kg bulk size in 14 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '7.000 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 14,
      });
    });

    test('should split 8,16kg bulk size in 16 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '8.160 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 16,
      });
    });

    test('should split 10kg bulk size in 20 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '10.000 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 20,
      });
    });

    test('should split 11kg bulk size in 22 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '11.000 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 22,
      });
    });

    test('should split 11,34kg bulk size in 22 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '11.340 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 22,
      });
    });

    test('should split 12,5kg bulk size in 25 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '12.500 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 25,
      });
    });

    test('should split 13kg bulk size in 26 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '13.000 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 26,
      });
    });

    test('should split 13.61kg bulk size in 27 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '13.610 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 27,
      });
    });

    test('should split 14.5kg bulk size in 29 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '14.500 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 29,
      });
    });

    test('should split 14.9kg bulk size in 29 parts á 0,5kg', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '14.900 kg',
        })
      ).toMatchObject({
        Einheit: '0,5 kg',
        Gebindegröße: 29,
      });
    });
  });

  describe('unit is 250g - number of units between 11 and 23', () => {
    test('should split 2,75kg bulk size in 11 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '2.750 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 11,
      });
    });

    test('should split 2,78kg bulk size in 11 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '2.780 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 11,
      });
    });

    test('should split 3kg bulk size in 12 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '3.000 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 12,
      });
    });

    test('should split 5kg bulk size in 20 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '5.000 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 20,
      });
    });

    test('should split 5.75kg bulk size in 23 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '5.750 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 23,
      });
    });

    test('should split 5.9kg bulk size in 23 parts á 250g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '5.900 kg',
        })
      ).toMatchObject({
        Einheit: '250 g',
        Gebindegröße: 23,
      });
    });
  });

  describe('unit is 100g - number of units between 13 and 27', () => {
    test('should split 1,3kg bulk size in 13 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.300 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 13,
      });
    });

    test('should split 1,6kg bulk size in 16 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.600 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 16,
      });
    });

    test('should split 1,92kg bulk size in 19 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.920 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 19,
      });
    });

    test('should split 2,5kg bulk size in 25 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '2.500 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 25,
      });
    });

    test('should split 2,7kg bulk size in 27 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '2.700 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 27,
      });
    });

    test('should split 2,73kg bulk size in 27 parts á 100g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '2.730 kg',
        })
      ).toMatchObject({
        Einheit: '100 g',
        Gebindegröße: 27,
      });
    });
  });

  describe('unit is 50g - number of units between 1 and 25', () => {
    test('should throw if bulk size is lower than 50g', () => {
      expect(() =>
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '0.012 kg',
        })
      ).toThrowError('Product with bulk size less than 50g');
    });

    test('should split 0,052kg bulk size in 1 part á 50g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '0.052 kg',
        })
      ).toMatchObject({
        Einheit: '50 g',
        Gebindegröße: 1,
      });
    });

    test('should split 0,96kg bulk size in 19 parts á 50g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '0.960 kg',
        })
      ).toMatchObject({
        Einheit: '50 g',
        Gebindegröße: 19,
      });
    });

    test('should split 1kg bulk size in 20 parts á 50g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.000 kg',
        })
      ).toMatchObject({
        Einheit: '50 g',
        Gebindegröße: 20,
      });
    });

    test('should split 1,25kg bulk size in 25 parts á 50g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.250 kg',
        })
      ).toMatchObject({
        Einheit: '50 g',
        Gebindegröße: 25,
      });
    });

    test('should split 1,29kg bulk size in 25 parts á 50g', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'kg',
          Nettofüllmenge_od_Mengenangabe_2: '1.290 kg',
        })
      ).toMatchObject({
        Einheit: '50 g',
        Gebindegröße: 25,
      });
    });
  });

  describe('unit is 1 Liter - number of units starts at 6', () => {
    test('should split 6L bulk size in 6 times 1 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '6.000 Liter',
        })
      ).toMatchObject({
        Einheit: '1 Liter',
        Gebindegröße: 6,
      });
    });

    test('should split 6.7L bulk size in 6 times 1 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '6.700 Liter',
        })
      ).toMatchObject({
        Einheit: '1 Liter',
        Gebindegröße: 6,
      });
    });

    test('should split 12L bulk size in 12 times 1 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '12.000 Liter',
        })
      ).toMatchObject({
        Einheit: '1 Liter',
        Gebindegröße: 12,
      });
    });
  });

  describe('unit is 0.5 Liter - number of units is between 1 and 11', () => {
    test('should throw if bulk size is lower than 0.5 Liter', () => {
      expect(() =>
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '0.200 Liter',
        })
      ).toThrowError('Product with bulk size less than 0.5 Liter');
    });

    test('should split O.8L bulk size in 1 times 0.5 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '0.800 Liter',
        })
      ).toMatchObject({
        Einheit: '0.5 Liter',
        Gebindegröße: 1,
      });
    });

    test('should split 5L bulk size in 10 times 0.5 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '5.000 Liter',
        })
      ).toMatchObject({
        Einheit: '0.5 Liter',
        Gebindegröße: 10,
      });
    });

    test('should split 5.99L bulk size in 11 times 0.5 Liter', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Liter',
          Nettofüllmenge_od_Mengenangabe_2: '5.990 Liter',
        })
      ).toMatchObject({
        Einheit: '0.5 Liter',
        Gebindegröße: 11,
      });
    });
  });

  describe('unit other than kg and Liter', () => {
    test('should use "Packung" if this is the origin', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Packung',
          Nettofüllmenge_od_Mengenangabe_2: '1.000 Packung',
        })
      ).toMatchObject({
        Einheit: 'Packung',
        Gebindegröße: 1,
      });
    });

    test('should use "Packung" if this is the origin', () => {
      expect(
        bode({
          ...fakeData,
          Kondition_auf: 'Packung',
          Nettofüllmenge_od_Mengenangabe_2: '15.000 Packung',
        })
      ).toMatchObject({
        Einheit: 'Packung',
        Gebindegröße: 15,
      });
    });

    test('should throw if "Packung" is not a whole number', () => {
      expect(() =>
        bode({
          ...fakeData,
          Kondition_auf: 'Packung',
          Nettofüllmenge_od_Mengenangabe_2: '15.300 Packung',
        })
      ).toThrowError('Packung needs to be a whole-number');
    });
  });

  /*
    the following cases are not ready to be tested yet
  
    test('should use "Beutel" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Beutel' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Beutel',
      });
    });
  
    test('should use "Glas" if this is the origin and trim', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Glas  ' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Glas',
      });
    });
  
    test('should use "Stück" if this is the origin and trim', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: '   Stück ' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Stück',
      });
    });
  
    test('should use "Eimer" if this is the origin and trim', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Eimer' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Eimer',
      });
    });
  
    test('should use "Flasche" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Flasche' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Flasche',
      });
    });
  
    test('should use "Dose" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Dose' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Dose',
      });
    });
  
    test('should use "Kanister" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Kanister' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Kanister',
      });
    });
  
    test('should use "Riegel" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Riegel' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Riegel',
      });
    });
  
    test('should use "Tafel" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Tafel' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Tafel',
      });
    });
  
    test('should use "Karton" if this is the origin', () => {
      expect(bode({ Bestellnummer: 1, Kondition_auf: 'Karton' })).toMatchObject({
        Bestellnummer: 1,
        Einheit: 'Karton',
      });
    });
    */

  // });

  test('should throw if Kondition_auf is not known', () => {
    expect(() =>
      bode({
        Kondition_auf: 'unknown',
      })
    ).toThrowError(
      'Einheit, Gebindegröße and Preis could not be calculated (Kondition_auf = unknown)'
    );
  });
});