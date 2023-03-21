import {Post} from "./post";
import {User} from "./user";
import {PadletUser} from "./padlet-user";

export interface Padlet {
  id: string;
  name: string;
  description: string;
  cover: string;

  posts?: Post[];

  padletUsers?: PadletUser[];

  created_at: string;
  updated_at: string;

  user_id: number;

  user?: User;

}
