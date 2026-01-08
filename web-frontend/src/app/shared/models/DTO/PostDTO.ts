import {Topic} from '../Topic';
import {ImageDTO} from './ImageDTO';
import {Account} from '../Account';

export interface PostDTO {
  title: string;
  message: string;
  isComment: boolean;
  provider: {id: string};
  images: ImageDTO[];
  topics: Topic[];
}
