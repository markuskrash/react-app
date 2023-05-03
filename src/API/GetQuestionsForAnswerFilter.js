import axios from "axios";
import host from '../settings/host'

class GetQuestionsForAnswerFilter {
    static async get(access_token, setQuestions, filter, setError) {
        try {
            const s = "Bearer "+access_token
            const questions = await axios.post(`${host}/api/questions/for_teacher/filter/`,{
                'filter': filter,
            }, {headers: {"Authorization": s}})
            setQuestions(questions.data.reverse())
            return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            // setIsAuth(false)
            setError(event)
        }
    }
}

export default GetQuestionsForAnswerFilter