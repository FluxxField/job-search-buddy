import { SET_JOBS } from "../actions";

export default function jobs(state = new Map(), { type, payload }) {
  switch (type) {
    case SET_JOBS:
      return new Map([...state, [payload.id, payload]]);
    default:
      return state;
  }
}
