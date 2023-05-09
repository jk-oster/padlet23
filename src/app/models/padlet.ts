import {Post} from "./post";
import {User} from "./user";
import {PadletUser} from "./padlet-user";

export interface Padlet {
  id: number;
  name: string;
  public: boolean;
  description: string;
  cover: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user?: User;
  padlet_user?: PadletUser[];
  posts?: Post[];
  post_count?: number;
}

export class PadletFactory {
  static empty(): Padlet {
    return {
      id: 0,
      name: '',
      public: true,
      description: '',
      cover: '',
      created_at: '',
      updated_at: '',
      user_id: 0,
      user: undefined,
      padlet_user: [],
      posts: [],
      post_count: 0,
    };
  }

  static fromObject(rawPadlet: any): Padlet {
    return {
      id: rawPadlet.id,
      name: rawPadlet.name,
      public: rawPadlet.public,
      description: rawPadlet.description,
      cover: rawPadlet.cover,
      created_at: rawPadlet.created_at,
      updated_at: rawPadlet.updated_at,
      user_id: rawPadlet.user_id,
      user: rawPadlet.user,
      padlet_user: rawPadlet.padlet_user,
      posts: rawPadlet.posts,
      post_count: rawPadlet.post_count,
    };
  }
}
