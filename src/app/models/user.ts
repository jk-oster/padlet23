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
