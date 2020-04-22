import { SET_USER_DATA } from "../actions";

export default function userData(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
