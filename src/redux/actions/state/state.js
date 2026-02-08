export const UpdateOwnState = (getdata)=>{
    return(dispatch)=>{
        dispatch({type:"UPDATE_STATE" , state:Math.random()})
    }
}