import axios from "axios";
import host from '../settings/host'

class GetQuestionsForAnswer {
    static async get(access_token, setQuestions, setError) {
        try {
            const s = "Bearer "+access_token
            const questions = await axios.get(`${host}/api/questions/for_teacher/`, {headers: {"Authorization": s}})
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

export default GetQuestionsForAnswer