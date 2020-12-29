export interface Athlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  created_at: Date;
  updated_at: Date;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend?: any;
  follower?: any;
}

export interface Map {
  id: string;
  summary_polyline: string;
  resource_state: number;
  polyline: string;
}

export interface MapUrls {
  url: string;
  retina_url: string;
}

export interface Segment {
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
}

export interface RouteModel {
  athlete: Athlete;
  description: string;
  distance: number;
  elevation_gain: number;
  id: number;
  id_str: string;
  map: Map;
  map_urls: MapUrls;
  name: string;
  private: boolean;
  resource_state: number;
  starred: boolean;
  sub_type: number;
  timestamp: number;
  created_at: Date;
  updated_at: Date;
  type: number;
  estimated_moving_time: number;
  segments: Segment[];
}
