//to combine all the reducers in one root reducer
//and pass root reducer to the store

import fetchQuestions from "./fetchQuestionsReducer";
import { combineReducers } from "redux";

const rootReducer= combineReducers({
    fetchQuestions
})

export default rootReducer