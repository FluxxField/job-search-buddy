import { SET_CURRENT_JOB } from "../actions";

export default function currentJob(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_JOB:
      return action.payload;
    default:
      return state;
  }
}
