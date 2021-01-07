export interface PaceCalculatorModel {
  hour: number;
  minute: number;
  sec: number;
  distanceUnit: kmMiles;
  distance: number;
  distanceType: number;
}


export enum kmMiles {
  KM = 'km',
  MILES = 'miles',
}
