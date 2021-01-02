

export interface PaceCalculatorModel {
  hour: number;
  minute: number;
  sec: number;
  kmMiles: kmMiles;
  distance: number;
  distanceSelect: number;
}


export enum kmMiles {
  KM = 'km',
  MILES = 'miles',
}
