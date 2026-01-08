import {createSelector} from '@ngrx/store';
import {General} from '../models/general';
import {GeneralActionTypes} from '../actions/general.actions';

export interface GeneralState {
  general: General;
}

const initialSidebarState: GeneralState = {
  general: new General({
    isShown: false,
    searchValue: '',
    route: {title: 'Home', icon: 'home', routes: ['Home', 'Dashboard']}
  })
};

export function generalReducer(generalState = initialSidebarState, action: any): GeneralState {
  switch (action.type) {
    case GeneralActionTypes.ACTION_TOGGLE:
      return {
        ...generalState, // no other properties, can be removed
        general: new General({
          isShown: !generalState.general.isShown,
          searchValue: generalState.general.searchValue,
          route: generalState.general.route
        })
      };
    case GeneralActionTypes.ACTION_SEARCH:
      return {
        ...generalState, // no other properties, can be removed
        general: new General({
          isShown: !generalState.general.isShown,
          searchValue: generalState.general.searchValue,
          route: generalState.general.route,
          ...action.payload
        })
      };

    case GeneralActionTypes.ACTION_ROUTE:
      return {
        ...generalState, // no other properties, can be removed
        general: new General({
          isShown: !generalState.general.isShown,
          searchValue: generalState.general.searchValue,
          route: generalState.general.route,
          ...action.payload
        })
      };
  }
  return generalState;
}

export const selectGeneralState = (state: any) => state.sidebarState;
export const selectGeneral = createSelector(selectGeneralState, (state) => state.general);
