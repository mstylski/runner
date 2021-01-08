export type Coordinates = [number, number];

export interface LatLang {
  data: Coordinates[];
  series_type: string;
  original_size: number;
  resolution: string;
}

export interface Distance {
  data: number[];
  series_type: string;
  original_size: number;
  resolution: string;
}

export type SegmentCoordinatesResponse = [Coordinates, Coordinates];

export interface SegmentCoordinatesModel {
  latlng: LatLang;
  distance: Distance;
}
