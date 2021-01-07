export interface Athlete {
  id: number;
  resource_state: number;
  firstname: string;
  lastname: string;
  profile_medium: string;
  profile: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Map {
  id: string;
  polyline: string;
  summary_polyline: string;
}

export interface AthletePrEffort {
  id: number;
  activity_id: number;
  elapsed_time: number;
  start_date: Date;
  start_date_local: Date;
  distance: number;
  is_kom: boolean;
}

export interface AthleteSegmentStats {
  pr_activity_id: number;
  pr_elapsed_time: number;
  pr_date: Date;
  effort_count: number;
}

export interface Segment {
  id: number;
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
  athlete_pr_effort: AthletePrEffort;
  athlete_segment_stats: AthleteSegmentStats;
}

export interface RoutesModel {
  athlete: Athlete;
  description: string;
  distance: number;
  elevation_gain: number;
  id: number;
  id_str: string;
  map: Map;
  map_urls: {
    url: string;
    retina_url: string;
  };
  name: string;
  private: boolean;
  starred: boolean;
  timestamp: number;
  type: number;
  sub_type: number;
  created_at: Date;
  updated_at: Date;
  estimated_moving_time: number;
  segments: Segment[];
}
