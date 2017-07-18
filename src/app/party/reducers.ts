/**
 * Created by arrtem on 7/8/17.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {AppStore} from '../app-store';

export const ADD_PARTY = 'ADD_PARTY';
export const UPDATE_PARTY = 'UPDATE_PARTY';
export const ADD_PARTIES = 'ADD_PARTIES';
export const ADD_MEMBER = 'ADD_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';

export function partyReducer(state: AppStore = {parties: []}, action: Action) {
  switch (action.type) {
    case ADD_PARTY:
      return {...state, parties: [...state.parties, action.payload]};
    case ADD_PARTIES:
      return {...state, parties: action.payload};
    case UPDATE_PARTY:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.id ? {
          ...party, name: action.payload.name, members: action.payload.members, goods: action.payload.goods
        } : party)
      };
    case ADD_MEMBER:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, members: [...party.members, action.payload.user]
          } : party
        )
      };
    case UPDATE_MEMBER:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, members: party.members.map(member => member.id === action.payload.user.id ?
            {
              ...member, nameFirst: action.payload.user.nameFirst, nameLast: action.payload.user.nameLast
            } : member
          )
          } : party
        )
      };
    default:
      return state;
  }
}
