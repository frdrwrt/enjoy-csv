const DISCOUNT = 0.02;

function splitBulk({
  Kondition_auf: unit,
  Nettofüllmenge_od_Mengenangabe_2,
  Listenpreis,
}) {
  const netto = parseFloat(Nettofüllmenge_od_Mengenangabe_2);
  let sizeString;
  let size;

  if (unit === 'kg') {
    if (netto >= 15) {
      sizeString = '1 kg';
      size = 1;
    }

    if (netto < 15 && netto >= 6) {
      sizeString = '0,5 kg';
      size = 0.5;
    }

    if (netto < 6 && netto >= 2.75) {
      sizeString = '250 g';
      size = 0.25;
    }

    if (netto < 2.75 && netto >= 1.3) {
      sizeString = '100 g';
      size = 0.1;
    }

    if (netto < 1.3 && netto >= 0.05) {
      sizeString = '50 g';
      size = 0.05;
    }

    if (netto < 0.05) {
      throw new Error('Product with bulk size less than 50g');
    }
  }

  if (unit === 'Liter') {
    if (netto >= 6) {
      sizeString = '1 Liter';
      size = 1;
    }

    if (netto < 6 && netto >= 0.5) {
      sizeString = '0.5 Liter';
      size = 0.5;
    }

    if (netto < 0.5) {
      throw new Error('Product with bulk size less than 0.5 Liter');
    }
  }

  if (unit === 'Packung') {
    if (netto % 1 !== 0) {
      throw new Error('Packung needs to be a whole-number');
    }

    sizeString = 'Packung';
    size = 1;
  }

  if (!sizeString) {
    throw new Error(
      `Einheit, Gebindegröße and Preis could not be calculated (Kondition_auf = ${unit})`
    );
  }

  return {
    Einheit: sizeString,
    Gebindegröße: Math.floor(netto / size),
    Nettopreis:
      Math.round((Listenpreis - Listenpreis * DISCOUNT) * size * 100) / 100,
  };
}

function category(Untergruppe, Produktgruppe) {
  if (!Untergruppe && !Produktgruppe) {
    throw new Error(
      'Kategorie could not be determined, because Untergruppe and Produktgruppe is undefined'
    );
  }
  return Untergruppe?.trim() ? Untergruppe?.trim() : Produktgruppe?.trim();
}

function tax(Mwst) {
  const mwst = Mwst?.trim()?.toLowerCase();
  if (mwst === 'voller mwst-satz') {
    return '19.00%';
  }
  if (mwst === 'halber mwst-satz') {
    return '7.00%';
  }
  throw new Error(`Tax could not be determined (${mwst})`);
}

const uniqueNames = [];
function rename({
  Artikelname,
  Kolli_Artikel,
  Nettofüllmenge_od_Mengenangabe_2,
}) {
  let name;
  if (Kolli_Artikel && Kolli_Artikel === 'Ja') {
    const bulk = ` ${Nettofüllmenge_od_Mengenangabe_2} Gebinde`;
    name = Artikelname.substring(0, 60 - bulk.length) + bulk;
  } else {
    name = Artikelname.substring(0, 60);
  }

  if (uniqueNames.includes(name)) {
    throw new Error(`Name (${name}) is not unique`);
  }
  uniqueNames.push(name);
  return name;
}
export function resetNameMemory() {
  return uniqueNames.splice(0, uniqueNames.length);
}

export default function bode({
  Artikelnr,
  Artikelname,
  Marke,
  MwSt_Deutschland,
  Produktgruppe,
  Untergruppe,
  Kondition_auf,
  Kolli_Artikel,
  Nettofüllmenge_od_Mengenangabe_2,
  Ursprünge,
  Listenpreis,
}) {
  const { Einheit, Gebindegröße, Nettopreis } = splitBulk({
    Kondition_auf,
    Nettofüllmenge_od_Mengenangabe_2,
    Listenpreis,
  });
  return {
    Bestellnummer: Artikelnr,
    Name: rename({
      Artikelname,
      Kolli_Artikel,
      Nettofüllmenge_od_Mengenangabe_2,
    }),
    Einheit,
    Gebindegröße,
    Nettopreis,
    Produzent: Marke,
    Mwst: tax(MwSt_Deutschland),
    Herkunft: Ursprünge,
    Kategorie: category(Untergruppe, Produktgruppe),
  };
}
