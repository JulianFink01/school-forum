import {Image} from '../../models/Image';
import {Language} from '../../models/Language';

export class General {
  isShown = false;
  searchValue: string;
  route: {
    title: string;
    icon: string;
    routes: string[]
  };

  constructor(data: any = null) {
    this.searchValue = '';
    this.route = {title: 'Home', icon: 'home', routes: ['Home', 'Dashboard']};
    if (data !== null) {
      Object.assign(this, data);
    }
  }


}
