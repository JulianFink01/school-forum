import {Action} from '@ngrx/store';
import {Route} from '../models/route';

export enum GeneralActionTypes {
  ACTION_TOGGLE = '[Cart] toggle',
  ACTION_SEARCH = '[Cart] search',
  ACTION_ROUTE = '[Cart] route'
}

export class SidebarToggle implements Action {
  readonly type = GeneralActionTypes.ACTION_TOGGLE;

  constructor(public payload: { isShown: false, searchValue: '' }) {
  }
}

export class SearchValue implements Action {
  readonly type = GeneralActionTypes.ACTION_SEARCH;

  constructor(public payload: { isShown: boolean; searchValue: string }) {
  }
}

export class ChangeRoute implements Action {
  readonly type = GeneralActionTypes.ACTION_ROUTE;

  constructor(public payload: { isShown: boolean; searchValue: string, route: Route }) {
  }
}
