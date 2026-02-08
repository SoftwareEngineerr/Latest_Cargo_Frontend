import axios from "axios";

export const ShowSubjects = (url, header, payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      const res = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${header}`
        },
        params: payload, // Pass payload as params
      });

      if (res.status === 200) {
        dispatch({
          type: 'FETCH_SUBJECT_DATA',
          response: res.data.message ,
        });
      }
    } catch (err) {
      console.error(err.response); // Log the error response for debugging
      dispatch({
        type: 'SHOW_MODAL',
        response: err.response.data || err.message,
        status: err.response ? err.response.status : '404'
      });
    } finally {
      dispatch({ type: "SHOW_LOADER", Seconds: '0' });
    }
  };
};
