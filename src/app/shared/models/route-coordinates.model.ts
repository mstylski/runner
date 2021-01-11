export type LatLang = [number, number];
export type DistanceAndLatitude = [number];

export interface RouteCoordinates {
  type: string;
  data: LatLang[];
}

export interface ElevationGrade {
  type: string;
  data: DistanceAndLatitude;
}

export type RouteCoordinatesResponse = [RouteCoordinates, RouteCoordinates];

export type  ElevationGradeResponse = [ElevationGrade];


