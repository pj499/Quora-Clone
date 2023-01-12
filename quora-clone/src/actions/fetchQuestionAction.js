const fetchQuestionAction= (questions)=>{
    return {
        type: 'fetchQuestions',
        questions
    }
}

export default fetchQuestionAction;