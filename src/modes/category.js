export default function category({
  Artikelnr,
  Produktgruppe,
  Untergruppe,
  ...others
}) {
  return {
    Bestellnummer: Artikelnr,
    Kategorie: Untergruppe?.trim()
      ? Untergruppe?.trim()
      : Produktgruppe?.trim(),
    ...others,
  };
}
