import axios from "axios";
import host from '../settings/host'

class GetQuestionsForAnswer {
    static async get(access_token, setQuestions, page, setTotalCount, setError) {
        try {
            const s = "Bearer "+access_token
            const questions = await axios.get(`${host}/api/questions/for_teacher/?page=${page}`, {headers: {"Authorization": s}})
            setQuestions(questions.data['results'].reverse())
            setTotalCount(questions.data['count'])
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

export default GetQuestionsForAnswer