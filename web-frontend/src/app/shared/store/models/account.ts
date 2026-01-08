import {Image} from '../../models/Image';
import {Language} from '../../models/Language';

export class Account {
  id = '';
  firstName = '';
  lastName = '';
  email = '';
  birthDay = '';
  thumbnail = {};
  biography = '';
  profilePicture = {};
  languages = {};
  hasAcceptedPrivacyPolicy = false;
  hasAcceptedTermsAndConditions = false;

  constructor(data: any = null) {
    if (data !== null) {
      if (data.account) {
        Object.assign(this, data.account);
      } else {
        Object.assign(this, data);
      }
    }
  }


}
