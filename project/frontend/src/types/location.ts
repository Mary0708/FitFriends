import { LatLngExpression } from 'leaflet';

export enum Location {
  Pionerskaya = 'Пионерская',
  Petrogradskaya = 'Петроградская',
  Udelnaya = 'Удельная',
  Zvyozdnaya = 'Звёздная',
  Sportivnaya = 'Спортивная',
}

export const LOCATION = [
  Location.Petrogradskaya,
  Location.Pionerskaya,
  Location.Sportivnaya,
  Location.Udelnaya,
  Location.Zvyozdnaya
];

export type Metro = {
  name: Location;
  location: LatLngExpression;
};

