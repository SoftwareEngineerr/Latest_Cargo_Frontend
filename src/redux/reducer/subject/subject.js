const initialState = {
    data:'',
};

const Subject = (state = initialState , action) => {
    switch(action.type){
        // Show Loader
        case 'FETCH_SUBJECT_DATA':
            return {...state , data: action.response }   
        default : 
        return state;
    }
}
export default Subject;
