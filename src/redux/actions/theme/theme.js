export const ChangeMode = (getdata)=>{
    return(dispatch)=>{
        dispatch({type:"CHANGE_MODE" , Mode:getdata})
    }
}
export const ChangeMenuItemColor = (getdata) => {
    return(dispatch)=>{
        dispatch({type:"CHANGE_MENU_ITEM_COLOR" , Color:getdata})
    }   
}
export const Sidemenusize = (getdata) => {
    return(dispatch)=>{
        dispatch({type:"CHANGE_MENU_SIZE" , Size:getdata})
    }   
}

export const UpdateData = (getdata) => {
    //console.log(getdata)
    return(dispatch)=>{
        dispatch({type:"UPDATE_DATA" , Size:getdata})
    }   
}