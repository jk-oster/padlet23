import {Rating} from "./rating";
import {User} from "./user";

export interface Post {
  id: number;
  content: string;
  cover: string;

  created_at: string;
  updated_at: string;
  user_id: number;
  user?: User;
  ratings?: Rating[];
  comments?: Comment[];

}
