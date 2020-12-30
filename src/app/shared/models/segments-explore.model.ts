export interface Segment {
  id: number;
  resource_state: number;
  name: string;
  climb_category: number;
  climb_category_desc: string;
  avg_grade: number;
  start_latlng: number[];
  end_latlng: number[];
  elev_difference: number;
  distance: number;
  points: string;
  starred: boolean;
  elevation_profile: string;
  local_legend_enabled: boolean;
}

export interface SegmentsExploreModel {
  segments: Segment[];
}
