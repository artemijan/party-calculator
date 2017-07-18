/**
 * Created by arrtem on 7/8/17.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {Party} from './party';

export const ADD_PARTY = 'ADD_PARTY';

export function partyReducer(state: { parties: Party[] } = {parties: []}, action: Action) {
  switch (action.type) {
    case ADD_PARTY:
      return {...state, parties: [...state.parties, action.payload]};
    default:
      return state;
  }
}
