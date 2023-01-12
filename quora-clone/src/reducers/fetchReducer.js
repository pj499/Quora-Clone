export default (state, action)=> {
    switch(action.type){
        case "fetchQuestions": 
            return {
                questions: action.questions
            }

        default:
            return state;
    }
}