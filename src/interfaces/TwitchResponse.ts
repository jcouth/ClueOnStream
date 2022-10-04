export interface Users {
  broadcaster_type: 'partner' | 'affiliate' | '';
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: 'staff' | 'admin' | 'global_mod' | '';
  view_count: any;
  email: string;
  created_at: string;
}

export interface Prediction {
  id: string;
  broadcaster_id: string;
  broadcaster_name: string;
  broadcaster_login: string;
  title: string;
  winning_outcome_id: string | null;
  outcomes: Array<{
    id: string;
    title: string;
    users: number;
    channel_points: number;
    top_predictors: Array<{
      user: {
        user_id: string;
        user_name: string;
        user_login: string;
        channel_points_used: number;
        channel_points_won: number;
      };
    }> | null;
    color: string;
  }>;
  prediction_window: number;
  status: 'RESOLVED' | 'ACTIVE' | 'CANCELED' | 'LOCKED';
  created_at: string;
  ended_at: string | null;
  locked_at: string | null;
}
