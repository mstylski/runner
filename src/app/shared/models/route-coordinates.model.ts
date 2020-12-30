export type LatLang = [number, number];
export type DistanceAndLatitude = [number];

export interface RouteCoordinatesModel {
  type: string;
  data: LatLang[];
}

export interface ElevationGradeModel {
  type: string;
  data: DistanceAndLatitude;
}

export type RouteCoordinatesResponse = [RouteCoordinatesModel, RouteCoordinatesModel];

export type  ElevationGradeResponse = [ElevationGradeModel];


