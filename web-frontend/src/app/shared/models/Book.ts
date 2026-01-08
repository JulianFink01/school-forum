import {Account} from './Account';
import {Image} from './Image';
import {Topic} from './Topic';
import {Rating} from './Rating';

export interface Book {
  id: string;
  isbn: string;
  name: string;
  author: string;
  description: string;
  price: number;
  status: string;
  sold: boolean;
  seller: Account;
  images: Image[];
  topics: Topic[];
  ratings: Rating[];
}

