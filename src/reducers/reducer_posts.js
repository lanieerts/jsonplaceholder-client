import { FETCH_POSTS, FETCH_SINGLE_POST } from '../actions/index';

export default function (state=[], action){
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload.data;
    case FETCH_SINGLE_POST:
      return action.payload.data;
  }
  return state;
}