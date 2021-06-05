import splitBulk from './splitBulk';

describe('splitBulk mode - unit is 1 kg - number of units beginning from 15', () => {
  test('should split 15kg bulk size in 15 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '15.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 15,
    });
  });

  // let's ignore decimals of these rare unconventional bulk sizes according to the used unit (in this example 1kg)
  test('should split 19.96kg bulk size in 19 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '19.960 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 19,
    });
  });

  test('should split 20kg bulk size in 20 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '20.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 20,
    });
  });

  test('should split 25kg bulk size in 25 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '25.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 25,
    });
  });

  test('should split 25,5kg bulk size in 25 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '25.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 25,
    });
  });

  test('should split 400kg bulk size in 400 parts á 1kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '400.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 400,
    });
  });

});

describe('splitBulk mode - unit is 0.5kg - number of units between 12 and 29', () => {
  test('should split 6kg bulk size in 12 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '6.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 12,
    });
  });

  test('should split 6,35kg bulk size in 12 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '6.350 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 12,
    });
  });

  test('should split 7kg bulk size in 14 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '7.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 14,
    });
  });

  test('should split 8,16kg bulk size in 16 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '8.160 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 16,
    });
  });

  test('should split 10kg bulk size in 20 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '10.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 20,
    });
  });

  test('should split 11kg bulk size in 22 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '11.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
      Gebindegröße: 15,
    });
  });

  test('should split 11,34kg bulk size in 22 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '11.340 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 22,
    });
  });

  test('should split 12,5kg bulk size in 25 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '12.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 25,
    });
  });

  test('should split 13kg bulk size in 26 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '13.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 26,
    });
  });
  
  test('should split 13.61kg bulk size in 27 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '13.610 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 27,
    });
  });

  test('should split 14.5kg bulk size in 29 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '14.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 29,
    });
  });
  
  test('should split 14.9kg bulk size in 29 parts á 0,5kg', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '14.900 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
      Gebindegröße: 29,
    });
  });
  
});

describe('splitBulk mode - unit is 250g - number of units between 11 and 23', () => {
  test('should split 2,75kg bulk size in 11 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.750 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 11,
    });
  });

  test('should split 2,78kg bulk size in 11 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.780 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 11,
    });
  });

  test('should split 3kg bulk size in 12 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '3.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 12,
    });
  });

  test('should split 5kg bulk size in 20 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '5.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 20,
    });
  });

  test('should split 5.75kg bulk size in 23 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '5.750 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 23,
    });
  });

  test('should split 5.9kg bulk size in 23 parts á 250g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '5.900 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
      Gebindegröße: 23,
    });
  });

});

describe('splitBulk mode - unit is 100g - number of units between 13 and 27', () => {
  test('should split 1,3kg bulk size in 13 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.300 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 13,
    });
  });

  test('should split 1,6kg bulk size in 16 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.600 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 16,
    });
  });

  test('should split 1,92kg bulk size in 19 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.920 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 19,
    });
  });

  test('should split 2,5kg bulk size in 25 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 25,
    });
  });

  test('should split 2,7kg bulk size in 27 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.700 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 27,
    });
  });

  test('should split 2,73kg bulk size in 27 parts á 100g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.730 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
      Gebindegröße: 27,
    });
  });

});

describe('splitBulk mode - unit is 50g - number of units between 1 and 25', () => {
  test('should throw if bulk size is lower than 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '0.012 kg' })).toContain(
      'Error: There is a product with bulk size less than 50g.');
  });

  test('should split 0,052kg bulk size in 1 part á 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '0.052 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
      Gebindegröße: 1,
    });
  });

  test('should split 0,96kg bulk size in 19 parts á 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '0.960 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
      Gebindegröße: 19,
    });
  });

  test('should split 1kg bulk size in 20 parts á 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
      Gebindegröße: 20,
    });
  });

  test('should split 1,25kg bulk size in 25 parts á 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.250 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
      Gebindegröße: 25,
    });
  });

  test('should split 1,29kg bulk size in 25 parts á 50g', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.290 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
      Gebindegröße: 25,
    });
  });

});

describe('splitBulk mode - unit is 1 Liter - number of units starts at 6', () => {
  test('should split 6L bulk size in 6 times 1 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '6.000 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '1 Liter',
      Gebindegröße: 6,
    });
  });

  test('should split 6.7L bulk size in 6 times 1 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '6.700 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '1 Liter',
      Gebindegröße: 6,
    });
  });

  test('should split 12L bulk size in 12 times 1 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '12.000 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '1 Liter',
      Gebindegröße: 12,
    });
  });

});

describe('splitBulk mode - unit is 0.5 Liter - number of units is between 1 and 11', () => {
  test('should throw if bulk size is lower than 0.5 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '0.200 Liter'})).toContain(
      'Error: There is a product with bulk size less than 0.5 Liter.');

  });

  test('should split O.8L bulk size in 1 times 0.5 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '0.800 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '0.5 Liter',
      Gebindegröße: 1,
    });
  });

  test('should split 5L bulk size in 10 times 0.5 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '5.000 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '0.5 Liter',
      Gebindegröße: 10,
    });
  });

  test('should split 5.99L bulk size in 11 times 0.5 Liter', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Liter' , Nettofüllmenge_od_Mengenangabe_2: '5.990 Liter'})).toEqual({
      Bestellnummer: 1,
      Einheit: '0.5 Liter',
      Gebindegröße: 11,
    });
  });

});

describe('splitBulk mode - unit other than kg and Liter', () => {
  test('should use "Packung" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Packung' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Packung',
    });
  });

  test('should use "Beutel" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Beutel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Beutel',
    });
  });

  test('should use "Glas" if this is the origin and trim', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Glas  ' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Glas',
    });
  });

  test('should use "Stück" if this is the origin and trim', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: '   Stück ' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Stück',
    });
  });

  test('should use "Eimer" if this is the origin and trim', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Eimer' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Eimer',
    });
  });

  test('should use "Flasche" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Flasche' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Flasche',
    });
  });

  test('should use "Dose" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Dose' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Dose',
    });
  });

  test('should use "Kanister" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Kanister' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Kanister',
    });
  });

  test('should use "Riegel" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Riegel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Riegel',
    });
  });

  test('should use "Tafel" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Tafel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Tafel',
    });
  });

  test('should use "Karton" if this is the origin', () => {
    expect(splitBulk({ Bestellnummer: 1, Kondition_auf: 'Karton' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Karton',
    });
  });
});
