import axios from "axios";

export const DeleteRequest = (url, header, mytype) => {
  return async (dispatch) => {
    try {
      // Uncomment these lines if you want to show a loader during the request
      // dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      const res = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${header}`
        }
      });

      //console.log(res)
      if (res.status === 200 || res.status === 304) {
        dispatch({
          type: mytype,
          response: res.data,
        });
        return res.data;

        // Uncomment these lines if you want to hide the loader after a delay
        // setTimeout(() => {
        //   dispatch({ type: "SHOW_LOADER", Seconds: '0' });
        // }, 1000);
      }
    } catch (err) {
      console.error(err.response); // Log the error response for debugging
      dispatch({
        type: 'SHOW_MODAL',
        response: err.response.data || err.message,
        status: err.response ? err.response.status : '404'
      });

      // Uncomment these lines if you want to hide the loader after an error
      // setTimeout(() => {
      //   dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      // }, 1000);
    }
  };
};
