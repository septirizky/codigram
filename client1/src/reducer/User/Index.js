import { GET_POSTING, ADD_POSTING, PROFILE, LOGIN, REGISTER } from "../../action/Actions";

const initialState = {
  getListPostingResult: false,
  getListPostingLoading: false,
  getListPostingError: false,

  addPostingResult: false,
  addPostingLoading: false,
  addPostingError: false,

  getProfileResult: false,
  getProfileLoading: false,
  getProfileError: false,

  loginUsersResult: false,
  loginUsersLoading: false,
  loginUsersError: false,

  registerUsersResult: false,
  registerUsersLoading: false,
  registerUsersError: false,
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTING:
      console.log("4. Masuk Reducer : ", action);
      return {
        ...state,
        getListPostingResult: action.payload.data,
        getListPostingLoading: action.payload.loading,
        getListPostingError: action.payload.errorMessage,
      };
    case ADD_POSTING:
      console.log("4. Masuk Reducer : ", action);
      return {
        ...state,
        addPostingResult: action.payload.data,
        addPostingLoading: action.payload.loading,
        addPostingError: action.payload.errorMessage,
      };
    case PROFILE:
      console.log("4. Masuk Reducer : ", action);
      return {
        ...state,
        getProfileResult: action.payload.data,
        getProfileLoading: action.payload.loading,
        getProfileError: action.payload.errorMessage,
      };
    case LOGIN:
      console.log("4. Masuk Reducer : ", action);
      return {
        ...state,
        loginUsersResult: action.payload.data,
        loginUsersLoading: action.payload.loading,
        loginUsersError: action.payload.errorMessage,
      };

    case REGISTER:
      return {
        ...state,
        registerUsersResult: action.payload.data,
        registerUsersLoading: action.payload.loading,
        registerUsersError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default list;
