import axios from "axios";

export const StudentRegistation = (url , token , payload) => {
        //console.log(payload)
        //let mypay = JSON.stringify(payload);
    return (dispatch) => {
        
        // //console.log(url , token , payload)
        // //console.log(typeof JSON.stringify(payload))
        const res = axios.post(url, payload, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
        dispatch({type:"SHOW_LOADER" , Seconds:'getdata'})
            if (res.status === 200) {
                //console.log(res)
                dispatch({
                    type: 'SHOW_MODAL',
                    response: res.data,
                    severity: 'Success'
                })
                

                setTimeout(()=>{
                        dispatch({type:"SHOW_LOADER" , Seconds:'0'})
                },1000)

            }
        })
        .catch((err) => {
            console.error(err); // Log the error response for debugging
            // dispatch({
            //     type: 'SHOW_MODAL',
            //     response: err.response.data || err.message,
            //     status: err.response ? err.response.status : '404'
            // });
        });
        
    };
  };