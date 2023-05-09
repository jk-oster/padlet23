import {User} from "./user";

export interface PadletUser extends User{
  pivot: {
    padlet_id: number,
    user_id: number,
    permission_level: number,
    accepted: number
  }
}

export class PadletUserFactory {
static empty(): PadletUser {
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
      pivot: {
        padlet_id: 0,
        user_id: 0,
        permission_level: 0,
        accepted: 0
      }
    };
  }

  static fromObject(rawPadletUser: any): PadletUser {
    return {
      id: rawPadletUser.id,
      name: rawPadletUser.name,
      created_at: rawPadletUser.created_at,
      updated_at: rawPadletUser.updated_at,
      avatar: rawPadletUser.avatar,
      posts: rawPadletUser.posts,
      ratings: rawPadletUser.ratings,
      comments: rawPadletUser.comments,
      padlets: rawPadletUser.padlets,
      padlet_user: rawPadletUser.padlet_user,
      pivot: rawPadletUser.pivot
    };
  }
}
