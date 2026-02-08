

const initialState = {
    classes:''
};

const Showclasses = (state = initialState , action) => {
    switch(action.type){
        // Show Loader
        case 'SHOW_CLASSES':
            return {...state , classes: action.response  }   
        default : 
        return state;
    }
}
export default Showclasses;
