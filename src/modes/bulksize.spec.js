import bulksize from './bulksize';
import demo from './bulksize';

describe('bulksize mode', () => {
  test('should use original bulk size if unit is kg', () => {
    expect(
      bulksize({
        Bestellnummer: 1,
        Kondition_auf: 'kg',
        Nettofüllmenge_od_Mengenangabe_2: '25.000 kg',
      })
    ).toEqual({
      Bestellnummer: 1,
      Gebindegröße: 25,
    });
  });

  test('should use one tenth of the bulk size if category contains either tee or spices', () => {
    {
      expect(
        bulksize({
          Bestellnummer: 1,
          Kategorie: 'Früchte- & Kräutertee',
        })
      ).toEqual({
        Bestellnummer: 1,
        Gebindegröße: '100g',
      });
    }

    {
      expect(
        bulksize({
          Bestellnummer: 1,
          Kategorie: 'Schwarzer und Grüner Tee',
          Nettofüllmenge_od_Mengenangabe_2: '20.000 kg'
        })
      ).toEqual({
        Bestellnummer: 1,
        Gebindegröße: '100g',
      });
    }

    {
      expect(
        bulksize({
          Bestellnummer: 1,
          Kategorie: 'Gewürze & Kräuter',
        })
      ).toEqual({
        Bestellnummer: 1,
        Gebindegröße: '100g',
      });
    }
  });

});
