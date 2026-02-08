export const ShowLoader = (getdata)=>{
    return(dispatch)=>{
        dispatch({type:"SHOW_LOADER" , Seconds:getdata})
    }
}