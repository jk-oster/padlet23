import {User} from "./user";

export interface Post {
  id: number;
  content: string;
  cover: string;

  created_at: string;
  updated_at: string;

  user_id: number;
  user?: User;

  comments_count: number;
  comments: Comment[];
  rating: number;
  rating_count: number;
  user_rating: number;
}
