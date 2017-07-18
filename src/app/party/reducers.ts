/**
 * Created by arrtem on 7/8/17.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {Party} from './party';
import AppState from '../AppState';

export const ADD_PARTY = 'ADD_PARTY';

const initialState = {
  parties: []
};

export function partyReducer(state: AppState = initialState, action: Action) {
  switch (action.type) {
    case ADD_PARTY:
      return {
        ...state,
        parties: [...state.parties, action.payload],
      };
    default:
      return state;
  }
}
