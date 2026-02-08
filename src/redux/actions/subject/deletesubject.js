import axios from "axios";

export const deleteSubject = (url, header, payload) => {
    return async (dispatch) => {
      try {
        dispatch({ type: "SHOW_LOADER", Seconds: "getdata" });
        //console.log(payload)
        const res = await axios.delete(`${url}/${payload.Srn}`  ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${header}`
          },
          // payload
        //   params: payload, // Pass payload as params
        });
  
        if (res.status === 200) {
            setTimeout(() => {
                dispatch({ type: "SHOW_LOADER", Seconds: '0' });
            }, 1000);
            dispatch({
                type: 'SHOW_MODAL',
                response: res.data,
                severity: "Success"
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
  