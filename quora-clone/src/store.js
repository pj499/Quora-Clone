import {createStore} from 'redux' 
import fetchReducer from './reducers/fetchReducer'

var defaultQuestionState={
    questions: []
};

function configureStore(){
    return createStore(fetchReducer, defaultQuestionState)
}

export default configureStore;