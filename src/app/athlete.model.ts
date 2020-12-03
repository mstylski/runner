export interface AthleteModel {

  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: true;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
  friend: null;
  follower: null;
  follower_count: number;
  friend_count: number;
  mutual_friend_count: number;
  athlete_type: number;
  date_preference: string;
  measurement_preference: string;
  clubs: [];
  ftp: null;
  weight: number;
  bikes: [
    {
      id: string,
      primary: true,
      name: string,
      resource_state: number,
      distance: number
    }
  ];
  shoes: [
    {
      id: string,
      primary: true,
      name: string,
      resource_state: number,
      distance: number
    }
  ];
}
