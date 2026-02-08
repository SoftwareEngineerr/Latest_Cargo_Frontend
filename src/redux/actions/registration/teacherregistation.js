import axios from "axios";

export const TeacherRegistation = (url , header , payload) => {
  
    return async (dispatch) => {
        //console.log(header)
        const res = axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${header}`
            }
        })
        .then((res) => {
            dispatch({type:"SHOW_LOADER" , Seconds:'getdata'})
            if (res.status === 200) {
                dispatch({
                    type: 'SHOW_MODAL',
                    response: res.data,
                    severity: 'Success'
                });
    
            setTimeout(()=>{
                dispatch({type:"SHOW_LOADER" , Seconds:'0'})
            },1000)
            }
        })
        .catch((err) => {
            console.error(err); // Log the error response for debugging
            dispatch({
                type: 'SHOW_MODAL',
                // response: err.response.data || err.message,
                // status: err.response ? err.response.status : '404'
            });
        });
        
    };
  };