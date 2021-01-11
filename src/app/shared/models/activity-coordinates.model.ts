export type LatLang = [number, number];

export interface ActivityCoordinates {
  type: string;
  data: LatLang[];
  series_type: string;
  original_size: number;
  resolution: string;
}

export type ActivityCoordinateResponse = [ActivityCoordinates, ActivityCoordinates];

