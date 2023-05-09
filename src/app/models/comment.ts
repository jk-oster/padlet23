import {User} from "./user";

export interface Comment {
  id: number;
  text: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  post_id: number;
  user_avatar: string;
  user?: User;
}

export class CommentFactory {
  static empty(): Comment {
    return {
      id: 0,
      text: '',
      created_at: '',
      updated_at: '',
      user_id: 0,
      post_id: 0,
      user_avatar: '',
      user: undefined,
    };
  }

  static fromObject(rawComment: any): Comment {
    return {
      id: rawComment.id,
      text: rawComment.text,
      created_at: rawComment.created_at,
      updated_at: rawComment.updated_at,
      user_id: rawComment.user_id,
      post_id: rawComment.post_id,
      user_avatar: rawComment.user_avatar,
      user: rawComment.user,
    };
  }
}
