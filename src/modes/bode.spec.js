import { describe, expect, test } from '@jest/globals';
import bode from './bode';

describe('bode naturkost', () => {
  test('should extract information from bode to format as expected by foodsoft', () => {
    expect(
      bode({
        Artikelnr: 1,
        Artikelname: 'Sendi Aufstrich',
        Marke: 'Zwergenwiese',
        MwSt_Deutschland: 'Halber MwSt-Satz',
        Produktgruppe: 'Aufstriche',
        Untergruppe: 'Aufstriche würzig',
        Kolli_Artikel: 'Nein',
        Kondition_auf: 'Glas',
        Nettofüllmenge_od_Mengenangabe_2: '6.000 Glas',
        Ursprünge: '',
        Listenpreis: 1.85,
      })
    ).toEqual({
      Status: undefined,
      Bestellnummer: 1,
      Name: 'Sendi Aufstrich',
      Notiz: '',
      Produzent: 'Zwergenwiese',
      Herkunft: '',
      Einheit: 'Glas',
      Nettopreis: 1.81,
      Mwst: '7.00%',
      Pfand: undefined,
      Gebindegröße: 6,
      // don't know why, but foodsoft expects two columns named 'geschützt' between Gebindegröße and Kategorie.
      // I never tried without these columns but also don't know how to test it in this setup
      geschützt: undefined,
      Kategorie: 'Aufstriche würzig',
    });
  });
});
