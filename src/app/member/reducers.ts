/**
 * Created by arrtem on 7/8/17.
 */
import {ActionReducer, Action} from '@ngrx/store';
import {User} from "./user";

export const ADD_USER = 'ADD_USER';

export function userReducer(state: User[], action: Action) {
  switch (action.type) {
    case ADD_USER:
      return state.push(action.payload);
    default:
      return state;
  }
}
