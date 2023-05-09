import {User} from "./user";
import {Comment} from "./comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  cover: string;

  created_at: string;
  updated_at: string;

  user_id: number;
  user?: User;

  comments_count: number;
  comments: Comment[];

  rating?: {
    rating: number;
    rating_count: number;
    user_rating: number;
    user_rating_id: number;
  };
}

export class PostFactory {
  static empty(): Post {
    return {
      id: 0,
      title: '',
      content: '',
      cover: '',
      created_at: '',
      updated_at: '',
      user_id: 0,
      user: undefined,
      comments_count: 0,
      comments: [],
      rating: {
        rating: 0,
        rating_count: 0,
        user_rating: 0,
        user_rating_id: 0,
      }
    };
  }

  static fromObject(rawPost: any): Post {
    return {
      id: rawPost.id,
      title: rawPost.title,
      content: rawPost.content,
      cover: rawPost.cover,
      created_at: rawPost.created_at,
      updated_at: rawPost.updated_at,
      user_id: rawPost.user_id,
      user: rawPost.user,
      comments_count: rawPost.comments_count,
      comments: rawPost.comments,
      rating: rawPost.rating,
    };
  }
}
