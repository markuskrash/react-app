import axios from "axios";
import host from '../settings/host'

class GetQuestionsForAnswerFilter {
    static async get(access_token, setQuestions, filter, page, setPage, setTotalCount, setError) {
        try {
            const s = "Bearer "+access_token
            if (setPage) {
                setPage(1)
                const questions = await axios.post(`${host}/api/questions/for_teacher/filter/?page=1`, {
                    'filter': filter,
                }, {headers: {"Authorization": s}})
                setQuestions(questions.data['results'])
                setTotalCount(questions.data['count'])
            }
            else {
                const questions = await axios.post(`${host}/api/questions/for_teacher/filter/?page=${page}`, {
                    'filter': filter,
                }, {headers: {"Authorization": s}})
                setQuestions(questions.data['results'])
                setTotalCount(questions.data['count'])
            }

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