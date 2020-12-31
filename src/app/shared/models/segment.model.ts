export interface AthletePrEffort {
  id: number;
  activity_id: number;
  elapsed_time: number;
  distance: number;
  start_date: Date;
  start_date_local: Date;
  is_kom: boolean;
}

export interface SegmentModel {
  id: number;
  resource_state: number;
  name: string;
  activity_type: string;
  distance: number;
  average_grade: number;
  maximum_grade: number;
  elevation_high: number;
  elevation_low: number;
  start_latlng: number[];
  end_latlng: number[];
  elevation_profile?: any;
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
  starred_date: Date;
  pr_time?: number;
  athlete_pr_effort: AthletePrEffort;
  total_elevation_gain: number;
}
