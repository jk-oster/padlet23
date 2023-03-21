import {Post} from "./post";

export interface Padlet {
  id: string;
  name: string;
  description: string;
  cover: string;

  posts?: Post[];

}
