import {Image} from '../Image';
import {ImageDTO} from './ImageDTO';


export interface AccountDTO {
  firstName: string;
  lastName: string;
  email: string;
  birthDay: string;
  thumbnail: Image | ImageDTO;
  profilePicture: Image | ImageDTO;
}
