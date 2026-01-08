import {Topic} from '../Topic';
import {Image} from "../Image";
import {TopicDTO} from "../DTO/TopicDTO";
import {ImageDTO} from "../DTO/ImageDTO";
import {Account} from "../Account";

export interface BookUpdateDTO {
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
}
