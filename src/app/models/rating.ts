import {User} from "./user";

export interface Rating {
  rating: number;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export class RatingFactory {
  static empty(): Rating {
    return {
      rating: 0,
      user_id: 0,
      post_id: 0,
      created_at: '',
      updated_at: '',
      user: undefined,
    };
  }

  static fromObject(rawRating: any): Rating {
    return {
      rating: rawRating.rating,
      user_id: rawRating.user_id,
      post_id: rawRating.post_id,
      created_at: rawRating.created_at,
      updated_at: rawRating.updated_at,
      user: rawRating.user,
    };
  }
}
