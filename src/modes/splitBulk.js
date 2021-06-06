import utils from '../libs/utils';

export default function splitBulk(
  {
    Kondition_auf: unit,
    Nettofüllmenge_od_Mengenangabe_2: nettoString,
    ...others
  },
  idx
) {
  const netto = parseFloat(nettoString);
  let amount;
  let size;

  if (unit === 'kg') {
    if (netto >= 15) {
      size = '1 kg';
      amount = Math.floor(netto);
    }

    if (netto < 15 && netto >= 6) {
      size = '0,5 kg';
      amount = Math.floor(netto / 0.5);
    }

    if (netto < 6 && netto >= 2.75) {
      size = '250 g';
      amount = Math.floor(netto / 0.25);
    }

    if (netto < 2.75 && netto >= 1.3) {
      size = '100 g';
      amount = Math.floor(netto / 0.1);
    }

    if (netto < 1.3 && netto >= 0.05) {
      size = '50 g';
      amount = Math.floor(netto / 0.05);
    }

    if (netto < 0.05) {
      return utils.skipRow(
        idx,
        'There is a product with bulk size less than 50g.'
      );
    }
  }

  if (unit === 'Liter') {
    if (netto >= 6) {
      size = '1 Liter';
      amount = Math.floor(netto);
    }

    if (netto < 6 && netto >= 0.5) {
      size = '0.5 Liter';
      amount = Math.floor(netto / 0.5);
    }

    if (netto < 0.5) {
      return utils.skipRow(
        idx,
        'There is a product with bulk size less than 0.5 Liter.'
      );
    }
  }

  if (unit === 'Packung') {
    if (netto % 1 !== 0) {
      return utils.skipRow(idx, 'Packung needs to be a whole-number.');
    }

    size = 'Packung';
    amount = Math.floor(netto);
  }

  return {
    Einheit: size,
    Gebindegröße: amount,
    ...others,
  };
}
