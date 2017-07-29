/**
 * Created by arrtem on 7/8/17.
 */
import {Action} from '@ngrx/store';
import {AppStore} from '../app-store';

export const ADD_PARTY = 'ADD_PARTY';
export const UPDATE_PARTY = 'UPDATE_PARTY';
export const ADD_PARTIES = 'ADD_PARTIES';
export const ADD_MEMBER = 'ADD_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const UPDATE_GOOD = 'UPDATE_GOOD';
export const ADD_GOOD = 'ADD_GOOD';
export const DELETE_GOOD = 'DELETE_GOOD';
export const DELETE_MEMBER = 'DELETE_MEMBER';
export const DELETE_PARTY = 'DELETE_PARTY';

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
    case DELETE_PARTY:
      return {
        ...state, parties: state.parties.filter(party => party.id !== action.payload.partyId)
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
    case DELETE_MEMBER:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, members: party.members.filter(member => member.id !== action.payload.memberId)
          } : party
        )
      };
    case UPDATE_GOOD:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, goods: party.goods.map(good => good.id === action.payload.good.id ?
            {
              ...good, name: action.payload.good.name
            } : good
          )
          } : party
        )
      };
    case ADD_GOOD:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, goods: [...party.goods, action.payload.good]
          } : party
        )
      };
    case DELETE_GOOD:
      return {
        ...state, parties: state.parties.map(party => party.id === action.payload.partyId ?
          {
            ...party, goods: party.goods.filter(good => good.id !== action.payload.goodId)
          } : party
        )
      };
    default:
      return state;
  }
}
