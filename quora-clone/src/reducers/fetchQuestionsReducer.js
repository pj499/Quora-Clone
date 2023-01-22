const initialQuestionsState= [];

const fetchQuestions= (state= initialQuestionsState, action)=> {
    switch(action.type){
        case "fetchQuestionsAction": 
            return action.questionsFromDB;
        default:
            return state;
    }
}

export default fetchQuestions