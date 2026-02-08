import axios from "axios";

export const Uploadimage = (url, header, payload) => {
  return async (dispatch) => {
    try {
      //console.log(url , header , payload)
      dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });

      const res = await axios.post(url, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${header}`
        }
      });

      if (res.status === 200) {
        //console.log(res);
        dispatch({
          type: 'IMAGE_LINK',
          link: res.data.link,
        });
        dispatch({
          type: 'SHOW_MODAL',
          response: res.data,
          severity: 'Success'
        });
       

        

        setTimeout(() => {
          dispatch({ type: "SHOW_LOADER", Seconds: '0' });
        }, 1000);

      }
    } catch (err) {
      console.error(err.response); // Log the error response for debugging
      dispatch({
        type: 'SHOW_MODAL',
        response: err.response.data || err.message,
        status: err.response ? err.response.status : '404'
      });
      setTimeout(() => {
        dispatch({ type: "SHOW_LOADER", Seconds: '0' });
      }, 1000);
    }
  };
};
