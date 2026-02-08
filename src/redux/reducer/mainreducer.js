const initialState = {
    Seconds:'',
};

const LoaderReducer = (state = initialState , action) => {
    switch(action.type){
        // Show Loader
        case 'SHOW_LOADER':
            return {...state , Seconds: action.Seconds }   
        default : 
        return state;
    }
}
export default LoaderReducer;
