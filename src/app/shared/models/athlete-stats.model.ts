export interface RecentRideTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count: number;
}

export interface AllRideTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface RecentRunTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count: number;
}

export interface AllRunTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface RecentSwimTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count: number;
}

export interface AllSwimTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface YtdRideTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface YtdRunTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface YtdSwimTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}

export interface AthleteStatsModel {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: RecentRideTotals;
  all_ride_totals: AllRideTotals;
  recent_run_totals: RecentRunTotals;
  all_run_totals: AllRunTotals;
  recent_swim_totals: RecentSwimTotals;
  all_swim_totals: AllSwimTotals;
  ytd_ride_totals: YtdRideTotals;
  ytd_run_totals: YtdRunTotals;
  ytd_swim_totals: YtdSwimTotals;
}



