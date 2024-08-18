export const anzahlWuerfel = 5;
export const minAnzahlSpiele = 1;
export const maxAnzahlSpiele = 6;

export type Feld = null | 0 | number;
export const ohneEingabe: Feld = null;
export const gestrichen: Feld = 0;

export const getFeldValue = (feld: Feld): number => {
  return typeof feld === 'number' ? feld : 0;
};
