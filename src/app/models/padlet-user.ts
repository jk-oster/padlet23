import {User} from "./user";

export interface PadletUser extends User{
  pivot: {
    padlet_id: number,
    user_id: number,
    permission_level: number,
    accepted: number
  }
}
