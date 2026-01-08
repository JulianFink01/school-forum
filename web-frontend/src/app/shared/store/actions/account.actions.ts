import { Action } from '@ngrx/store';
import {Account} from '../../models/Account';

export enum AccountActionTypes {
  ACTION_LOGOUT = '[Account] Logout',
  ACTION_LOGIN = '[Account] Login'
}

export class AccountLogout implements Action {
  readonly type = AccountActionTypes.ACTION_LOGOUT;
}

export class AccountLogin implements Action {
  readonly type = AccountActionTypes.ACTION_LOGIN;
  constructor(public payload: { account: Account | null }) {
  }
}
