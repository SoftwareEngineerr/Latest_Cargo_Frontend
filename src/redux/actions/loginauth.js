import axios from "axios";
import { UserData } from "../../hooks/FirstTimeWebSrn/Websrn";
import { useNavigate } from 'react-router';

export const loginauth = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      const url = payload.api;
      const res = await axios.post(url, payload);

      setTimeout(() => {
        dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      }, 1000);

      if (res.status === 200) {
        sessionStorage.setItem("User_Data", JSON.stringify(res.data));
        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          response: res.data.token,
          userdata: res.data
        });

        // 👇 return value so component can handle it
        return { success: true, data: res.data };
      } else {
        dispatch({
          type: 'FETCH_DATA_ERROR',
          error: res.status,
          response: res.data
        });

        dispatch({
          type: 'SHOW_MODAL',
          response: res.data,
          status: '404'
        });

        return { success: false, data: res.data };
      }
    } catch (err) {
      setTimeout(() => {
        dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      }, 1000);

      dispatch({
        type: 'SHOW_MODAL',
        response: err?.response?.data || 'Login error',
        status: '404'
      });

      return { success: false, data: err?.response?.data || null };
    }
  };
};


export const checklogin = () => {
  // //console.log(UserData.token);

  // TODO: Add token validation logic here if needed

  return (dispatch) => {
    dispatch({
      type: 'FETCH_DATA_SUCCESS',
      response: UserData.token,
      userdata: UserData
    });
  };
};


export const Logout = (payload) => {
    const navigate = useNavigate()//emove the # prefix

  console.group(payload)
  return async (dispatch) => {
    try { 
      localStorage.setItem("LoggedIn", 'False') 
      navigate("/login"); 
      sessionStorage.clear();
      dispatch({ type: 'TOKENNOTVALID' })
    }
    catch (err) {
      dispatch({ type: 'FETCH_DATA_ERROR', error: 'server error' })
    }
  }
}