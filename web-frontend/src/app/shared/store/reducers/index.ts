import { ActionReducerMap } from '@ngrx/store';

import {accountReducer, AccountState} from './account.reducer';
import {generalReducer, GeneralState} from './general.reducer';

interface AppState {
  sidebarState: GeneralState;
  accountState: AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  sidebarState: generalReducer,
  accountState: accountReducer
};
