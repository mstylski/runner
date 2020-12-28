export interface Map {
  id: string;
  polyline: string;
  resource_state: number;
}

export interface AthleteSegmentStats {
  pr_elapsed_time: number;
  pr_date: string;
  effort_count: number;
}

export interface SegmentsModel {
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
  climb_category: number;
  city: string;
  state: string;
  country: string;
  private: boolean;
  hazardous: boolean;
  starred: boolean;
  created_at: Date;
  updated_at: Date;
  total_elevation_gain: number;
  map: Map;
  effort_count: number;
  athlete_count: number;
  star_count: number;
  athlete_segment_stats: AthleteSegmentStats;
}
