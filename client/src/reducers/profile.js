import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_MORE_PROFILES,
  END_OF_PROFILES,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  loadingMore: true,
  endOfProfiles: false,
  error: {},
};

function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        loadingMore: false,
        endOfProfiles: false,
      };
    case GET_MORE_PROFILES:
      return {
        ...state,
        profiles: [...new Set([...state.profiles, ...payload])],
        loading: false,
        loadingMore: false,
      };
    case END_OF_PROFILES:
      return {
        ...state,
        endOfProfiles: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
