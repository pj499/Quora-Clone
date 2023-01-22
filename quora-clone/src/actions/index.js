

const fetchQuestionsActionFunction= (questionsFromDB) =>{
    return {
        type: 'fetchQuestionsAction',
        questionsFromDB
    }
}

export default fetchQuestionsActionFunction;