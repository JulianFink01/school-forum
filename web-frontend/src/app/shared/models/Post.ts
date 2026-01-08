import {Image} from './Image';
import {Topic} from './Topic';
import {Rating} from './Rating';
import {Account} from './Account';

export interface Post {
  id: string | null;
  title: string | null;
  message: string | null;
  provider: Account;
  images: Image[];
  topics: Topic[];
  comments: Post[] | null;
  ratings: Rating[] | null;
  timestamp: string | null;
  isComment: boolean;
}
