import { READ_CONTRIBUTORS, READ_ISSUES, READ_LANGUAGES } from './../actions';

const INITIAL_ABOUT_STATE = { contributors: [], languages: [], pullRequests: [], issues: [] };

export default function (state = INITIAL_ABOUT_STATE, action) {
  switch(action.type) {
    case READ_CONTRIBUTORS:
      return {...state, contributors: action.payload.data};
    case READ_ISSUES:
      return {...state, issues: action.payload.data};
    case READ_LANGUAGES:
      return {...state, languages: action.payload.data};
    default:
      return state;
  }
}
