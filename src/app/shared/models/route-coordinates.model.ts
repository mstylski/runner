export type LatLang = [number, number];

export interface RouteCoordinatesModel {
  type: string;
  data: LatLang[];
}

export type RouteCoordinatesResponse = [RouteCoordinatesModel, RouteCoordinatesModel];
