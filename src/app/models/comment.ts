import {User} from "./user";

export interface Comment {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  post_id: number;
  user?: User;
}
