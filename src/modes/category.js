export default function category({ Artikelnr, Produktgruppe, Untergruppe }) {
  return {
    Bestellnummer: Artikelnr,
    Kategorie: Untergruppe?.trim()
      ? Untergruppe?.trim()
      : Produktgruppe?.trim(),
  };
}
