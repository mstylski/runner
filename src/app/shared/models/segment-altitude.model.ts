export interface Distance {
  data: [number];
  series_type: string;
  original_size: number;
  resolution: string;
}

export interface Altitude {
  data: [number];
  series_type: string;
  original_size: number;
  resolution: string;
}

export interface SegmentAltitude {
  altitude: Altitude;
  distance: Distance;
}
