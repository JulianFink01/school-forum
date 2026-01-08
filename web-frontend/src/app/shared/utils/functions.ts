import {ChangeRoute} from '../store/actions/general.actions';
import {AccountService} from '../services/account.service';
import {Store} from '@ngrx/store';
import {GeneralState} from '../store/reducers/general.reducer';
import {Account} from '../models/Account';

export function setRoute(generalStateStore: Store<GeneralState>, newTitle: string, newIcon: string, newRoutes: string[]): void {
  generalStateStore.dispatch(new ChangeRoute({
      isShown: false,
      searchValue: '',
      route: {
        title: newTitle,
        icon: newIcon,
        routes: newRoutes
      }
    }
    )
  );
}

export function sendMail(email: string, name: string): void {
  window.location.href = 'mailto:' + email + '?subject=Hello ' + name + '&body=Write your message here!';
}
