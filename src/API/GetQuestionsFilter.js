import axios from "axios";
import host from '../settings/host'

class GetQuestionsFilter {
    static async get(access_token, setQuestions, filter, setError) {
        try {
            const s = "Bearer "+access_token
            const questions = await axios.post(`${host}/api/questions/for_student/filter/`,{
                'filter': filter,
            }, {headers: {"Authorization": s}})
            setQuestions( questions.data.reverse())
            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

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

export default GetQuestionsFilter