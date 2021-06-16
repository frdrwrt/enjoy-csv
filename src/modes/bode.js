const DISCOUNT = 0.02;

function splitBulk({
  Kondition_auf,
  Nettofüllmenge_oder_Mengenangabe,
  Nettofüllmenge_od_Mengenangabe_2,
  Listenpreis,
}) {
  const unit = Kondition_auf === 'Eimer' ? 'kg' : Kondition_auf;
  const netto = parseFloat(
    unit === 'Karton'
      ? Nettofüllmenge_oder_Mengenangabe
      : Nettofüllmenge_od_Mengenangabe_2
  );
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

  if (
    [
      'Packung',
      'Glas',
      'Stück',
      'Flasche',
      'Becher',
      'Dose',
      'Kanister',
      'Riegel',
      'Tafel',
      'Riegel',
      'EloPak',
      'Beutel',
      'Karton',
    ].includes(unit)
  ) {
    if (netto % 1 !== 0) {
      throw new Error(`${unit} needs to be a whole-number`);
    }

    sizeString = `1 ${unit}`;
    size = 1;
  }

  if (!sizeString) {
    throw new Error(
      `Einheit, Gebindegröße and Preis could not be calculated (Kondition_auf = ${unit})`
    );
  }

  const exactNetPrice = (Listenpreis - Listenpreis * DISCOUNT) * size;
  return {
    Einheit: sizeString,
    Gebindegröße: Math.floor(netto / size),
    Nettopreis: Math.round(exactNetPrice * 100) / 100,
    exactNetPrice,
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

let uniqueNrName = {};
function rename({
  Artikelnr,
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

  if (
    Object.keys(uniqueNrName).includes(Artikelnr.toString()) &&
    uniqueNrName[Artikelnr] === name
  ) {
    throw new Error(`Article ${Artikelnr} called ${name} is not unique.`);
  } else if (
    Object.keys(uniqueNrName).includes(Artikelnr.toString()) &&
    uniqueNrName[Artikelnr] !== name
  ) {
    throw new Error(
      `Article ${Artikelnr} already exists but with two different names: ${uniqueNrName[Artikelnr]}, ${name}`
    );
  } else if (
    Object.values(uniqueNrName).includes(name) &&
    !Object.keys(uniqueNrName).includes(Artikelnr.toString())
  ) {
    const articleNrForExistingName = Object.keys(uniqueNrName).find(
      (key) => uniqueNrName[key] === name
    );
    throw new Error(
      `The name ${name} is the same for article number ${articleNrForExistingName} and ${Artikelnr}.`
    );
  }
  uniqueNrName[Artikelnr] = name;
  return name;
}

function checkPriceCalculation(
  { Artikelnr, Listen_VK_Preis, discount = DISCOUNT },
  { Nettopreis, Gebindegröße }
) {
  const priceForBulkInFoodsoft =
    Math.round(Nettopreis * Gebindegröße * 100) / 100;
  const priceForBulkInOriginalData =
    Math.round(Listen_VK_Preis * (1 - discount) * 100) / 100;
  if (priceForBulkInFoodsoft !== priceForBulkInOriginalData) {
    throw new Error(
      `Price calculation fails for article ${Artikelnr}. ` +
        `Price summarized in foodsoft is ${priceForBulkInFoodsoft}. ` +
        `Original, but discounted sell price is ${priceForBulkInOriginalData}.`
    );
  }
  return true;
}

export function resetNameMemory() {
  uniqueNrName = {};
}

export default function bode(
  {
    Artikelnr,
    Artikelname,
    Marke,
    MwSt_Deutschland,
    Produktgruppe,
    Untergruppe,
    Kondition_auf,
    Kolli_Artikel,
    Nettofüllmenge_oder_Mengenangabe,
    Nettofüllmenge_od_Mengenangabe_2,
    Ursprünge,
    Listenpreis,
    Listen_VK_Preis,
  },
  doublePriceCheck = false
) {
  const { Einheit, Gebindegröße, Nettopreis, exactNetPrice } = splitBulk({
    Kondition_auf,
    Nettofüllmenge_oder_Mengenangabe,
    Nettofüllmenge_od_Mengenangabe_2,
    Listenpreis,
  });

  if (doublePriceCheck) {
    checkPriceCalculation(
      {
        Artikelnr,
        Listen_VK_Preis,
        DISCOUNT,
      },
      {
        Nettopreis: exactNetPrice,
        Gebindegröße,
      }
    );
  }
  return {
    Bestellnummer: Artikelnr,
    Name: rename({
      Artikelnr,
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
