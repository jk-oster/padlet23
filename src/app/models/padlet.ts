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
}
