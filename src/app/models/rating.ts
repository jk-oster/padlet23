import {User} from "./user";

export interface Rating {
  rating: number;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}
