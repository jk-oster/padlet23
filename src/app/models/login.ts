import {User} from "./user";

export interface Login {
  access_token: string;
  token_type: string;
  expires_in: number;
  user?: User;
}

export class LoginFactory {
  static empty(): Login {
    return {
      access_token: '',
      token_type: '',
      expires_in: 0,
      user: undefined,
    };
  }

  static fromObject(rawLogin: any): Login {
    return {
      access_token: rawLogin.access_token,
      token_type: rawLogin.token_type,
      expires_in: rawLogin.expires_in,
      user: rawLogin.user,
    };
  }
}
