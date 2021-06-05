import category from './category';

describe('category mode', () => {
  test('should rename order number and set category if secondary category is given', () => {
    expect(
      category({
        Artikelnr: 1,
        Produktgruppe: ' non alcoholic drinks  ',
        Untergruppe: 'milk-drinks',
      })
    ).toEqual({
      Bestellnummer: 1,
      Kategorie: 'milk-drinks',
    });
  });

  test('should use primary category if secondary is empty and trim', () => {
    expect(
      category({
        Artikelnr: 1,
        Produktgruppe: ' non alcoholic drinks   ',
        Untergruppe: '    ',
      })
    ).toEqual({
      Bestellnummer: 1,
      Kategorie: 'non alcoholic drinks',
    });
  });

  test('should use primary category if secondary is null and trim', () => {
    expect(
      category({
        Artikelnr: 1,
        Produktgruppe: ' non alcoholic drinks   ',
        Untergruppe: null,
      })
    ).toEqual({
      Bestellnummer: 1,
      Kategorie: 'non alcoholic drinks',
    });
  });
});
