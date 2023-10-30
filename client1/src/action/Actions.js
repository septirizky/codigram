import axios from "axios";

export const GET_POSTING = "GET_POSTING";
export const ADD_POSTING = "ADD_POSTING";
export const PROFILE = "PROFILE";
export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";

export const getPosting = () => {
  console.log("2. Masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_POSTING,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "GET",
      url: "http://localhost:3000/posting",
      timeout: 120000,
    })
      .then((response) => {
        console.log("3. Berhasil dapat data : ", response);
        //berhasil get API
        dispatch({
          type: GET_POSTING,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. Gagal dapat data : ", error);
        //gagal get API
        dispatch({
          type: GET_POSTING,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addPosting = (data) => {
  // console.log("2. Masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_POSTING,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios({
      method: "POST",
      url: "http://localhost:3000/posting/createPost",
      timeout: 120000,
      data: data,
    })
      .then((response) => {
        // console.log("3. Berhasil dapat data : ", response);
        //berhasil get API
        dispatch({
          type: ADD_POSTING,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        console.log("3. Gagal dapat data : ", error);
        //gagal get API
        dispatch({
          type: ADD_POSTING,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getProfile = (id) => {
  return async (dispatch) => {
    dispatch({
      type: PROFILE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "GET",
      url: "http://localhost:3000/user/detail/" + id,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: PROFILE,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: PROFILE,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};

export const LoginUsers = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:3000/user/login",
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        sessionStorage.setItem("userdata", JSON.stringify(res.data));
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: e.response.data.message,
          },
        });
      });
  };
};

export const RegisterUsers = (data) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:3000/user/register",
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((e) => {
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: "asfs",
          },
        });
      });
  };
};
