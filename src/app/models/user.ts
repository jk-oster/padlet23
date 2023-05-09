import {Padlet} from "./padlet";
import {Post} from "./post";
import {Rating} from "./rating";
import {PadletUser} from "./padlet-user";

export interface User {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  avatar: string;
  posts?: Post[];
  ratings?: Rating[];
  comments?: Comment[];
  padlets?: Padlet[];
  padlet_user?: PadletUser[];
}

export class UserFactory {
  static empty(): User {
    return {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
      avatar: '',
      posts: [],
      ratings: [],
      comments: [],
      padlets: [],
      padlet_user: [],
    };
  }

  static fromObject(rawUser: any): User {
    return {
      id: rawUser.id,
      name: rawUser.name,
      created_at: rawUser.created_at,
      updated_at: rawUser.updated_at,
      avatar: rawUser.avatar,
      posts: rawUser.posts,
      ratings: rawUser.ratings,
      comments: rawUser.comments,
      padlets: rawUser.padlets,
      padlet_user: rawUser.padlet_user,
    };
  }
}
