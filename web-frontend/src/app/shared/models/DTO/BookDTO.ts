import {Topic} from '../Topic';
import {Account} from '../Account';
import {ImageDTO} from './ImageDTO';

export interface BookDTO{
  isbn: string;
  name: string;
  author: string;
  description: string;
  price: number;
  status: string;
  seller: {id: string};
  isSold: boolean;
  images: ImageDTO[];
  topics: Topic[];
}
