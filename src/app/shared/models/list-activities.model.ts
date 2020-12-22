
export interface Athlete {
  id: number;
  resource_state: number;
}

export interface Map {
  id: string;
  summary_polyline?: any;
  resource_state: number;
}

export interface Activities {
  resource_state?: number;
  athlete?: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time?: number;
  total_elevation_gain?: number;
  type?: string;
  workout_type?: any;
  id: number;
  external_id?: string;
  upload_id?: number;
  start_date: Date;
  start_date_local: Date;
  timezone?: string;
  utc_offset?: number;
  start_latlng: any;
  end_latlng: any;
  location_city?: any;
  location_state?: any;
  location_country?: string;
  achievement_count?: number;
  kudos_count?: number;
  comment_count?: number;
  athlete_count?: number;
  photo_count?: number;
  map: Map[];
  trainer?: boolean;
  commute?: boolean;
  manual?: boolean;
  private?: boolean;
  flagged?: boolean;
  gear_id?: string;
  from_accepted_tag?: boolean;
  average_speed?: number;
  max_speed?: number;
  average_cadence?: number;
  average_watts?: number;
  weighted_average_watts?: number;
  kilojoules?: number;
  device_watts?: boolean;
  has_heartrate?: boolean;
  average_heartrate?: number;
  max_heartrate?: number;
  max_watts?: number;
  pr_count?: number;
  total_photo_count?: number;
  has_kudoed?: boolean;
  suffer_score?: number;
}
