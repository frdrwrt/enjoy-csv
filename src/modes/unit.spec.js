import demo from './demo';

describe('unit mode - unit is kg', () => {
  test('should split 25kg bulk size in 25 parts á 1kg', () => {
    expect(
      unit({
        Bestellnummer: 1,
        Kondition_auf: 'kg',
        Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
      })
    ).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
    });
  });

  test('should split 20kg bulk size in 20 parts á 1kg', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '20.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '1 kg',
    });
  });

  test('should split 10kg bulk size in 20 parts á 0,5kg', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '10.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
    });
  });

  test('should split 12,5kg bulk size in 25 parts á 0,5kg', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '12.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
    });
  });

  test('should split 12,5kg bulk size in 25 parts á 0,5kg', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '12.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '0,5 kg',
    });
  });

  test('should split 5kg bulk size in 20 parts á 250g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '5.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
    });
  });

  test('should split 3kg bulk size in 12 parts á 250g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '3.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '250 g',
    });
  });

  test('should split 1kg bulk size in 20 parts á 50g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
    });
  });

  test('should split 1kg bulk size in 20 parts á 50g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '1.000 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '50 g',
    });
  });

  test('should split 2,5kg bulk size in 25 parts á 100g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
    });
  });

  test('should split 2,5kg bulk size in 25 parts á 100g', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'kg', Nettofüllmenge_od_Mengenangabe_2: '2.500 kg' })).toEqual({
      Bestellnummer: 1,
      Einheit: '100 g',
    });
  });
});

describe('unit mode - unit other than kg', () => {
  test('should use Liter as unit if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Liter' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'kg',
    });
  });

  test('should use "Packung" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Packung' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Packung',
    });
  });

  test('should use "Beutel" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Beutel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Beutel',
    });
  });

  test('should use "Glas" if this is the origin and trim', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Glas  ' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Glas',
    });
  });

  test('should use "Stück" if this is the origin and trim', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: '   Stück ' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Stück',
    });
  });

  test('should use "Eimer" if this is the origin and trim', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Eimer' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Eimer',
    });
  });

  test('should use "Flasche" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Flasche' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Flasche',
    });
  });

  test('should use "Dose" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Dose' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Dose',
    });
  });

  test('should use "Kanister" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Kanister' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Kanister',
    });
  });

  test('should use "Riegel" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Riegel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Riegel',
    });
  });

  test('should use "Riegel" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Tafel' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Tafel',
    });
  });

  test('should use "Karton" if this is the origin', () => {
    expect(unit({ Bestellnummer: 1, Kondition_auf: 'Karton' })).toEqual({
      Bestellnummer: 1,
      Einheit: 'Karton',
    });
  });
});
