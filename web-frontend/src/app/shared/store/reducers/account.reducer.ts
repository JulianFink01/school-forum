import {Account} from '../models/account';
import {AccountActionTypes} from '../actions/account.actions';
import {createSelector} from "@ngrx/store";

export interface AccountState {
  user: Account;
}

const initialLoginState: AccountState = {
  user: new Account()
};


export function accountReducer(appUserState = initialLoginState, action: any): AccountState {
  switch (action.type) {
    case AccountActionTypes.ACTION_LOGOUT:
      return {
        ...appUserState,
        user: initialLoginState.user
      };
    case AccountActionTypes.ACTION_LOGIN:
      return {
        ...appUserState,
        user: new Account({
          ...action.payload
        })
      };
  }
  return appUserState;
}

export const selectAccountState = (state: any) => state.accountState;
export const selectAccount = createSelector(selectAccountState, (state) => state.user);
