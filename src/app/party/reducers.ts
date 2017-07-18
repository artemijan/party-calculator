/**
 * Created by arrtem on 7/8/17.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {AppStore} from '../app-store';

export const ADD_PARTY = 'ADD_PARTY';
export const ADD_PARTIES = 'ADD_PARTIES';
export const ADD_MEMBER = 'ADD_MEMBER';

export function partyReducer(state: AppStore = {parties: []}, action: Action) {
  switch (action.type) {
    case ADD_PARTY:
      return {...state, parties: [...state.parties, action.payload]};
    case ADD_PARTIES:
      return {...state, parties: action.payload};
    case ADD_MEMBER:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, members: [...party.members, action.payload.user]
          } : party
        )
      };
    default:
      return state;
  }
}
