import {Topic} from '../Topic';
import {Image} from "../Image";
import {TopicDTO} from "../DTO/TopicDTO";
import {ImageDTO} from "../DTO/ImageDTO";

export interface PostUpdateDTO {
  id: string;
  title: string;
  message: string;
  images: ImageDTO[];
  topics: TopicDTO[];
}
