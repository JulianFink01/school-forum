import {Image} from './Image';
import {Language} from './Language';
import {ImageDTO} from './DTO/ImageDTO';

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  biography: string;
  email: string;
  birthDay: string;
  thumbnail: Image | ImageDTO;
  profilePicture: Image | ImageDTO;
  languages: Language[];
  hasAcceptedPrivacyPolicy: boolean;
  hasAcceptedTermsAndConditions: boolean;
}
