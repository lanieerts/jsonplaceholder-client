import { READ_ISSUES } from './../actions';

const INITIAL_ABOUT_STATE = { contributors: [], languages: [], pullRequests: [], issues: [] };

export default function (state = INITIAL_ABOUT_STATE, action) {
  switch(action.type) {
    case READ_ISSUES:
      return {...state, issues: action.payload.data};
    default:
      return state;
  }
}
