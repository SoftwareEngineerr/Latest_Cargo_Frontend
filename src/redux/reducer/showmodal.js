const initialState = {
    data:'',
    severity: ''
};

const ShowModal = (state = initialState , action) => {
    switch(action.type){
        // Show Loader
        case 'SHOW_MODAL':
            return {...state , data: action.response , severity:action.severity }   
        default : 
        return state;
    }
}
export default ShowModal;
