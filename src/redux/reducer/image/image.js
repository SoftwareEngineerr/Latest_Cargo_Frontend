const initialState = {
    link:'',
};

const Uploadimage = (state = initialState , action) => {
    switch(action.type){
        // Show Loader
        case 'IMAGE_LINK':
            return {...state , link: action.link, }   
        default : 
        return state;
    }
}
export default Uploadimage;
