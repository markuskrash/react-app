import axios from "axios";
import host from '../settings/host'

class GetQuestions {
    static async get(access_token, setQuestions, setError) {
        try {
            const s = "Bearer "+access_token
            const questions = await axios.get(`${host}/api/questions/for_student/`, {headers: {"Authorization": s}})
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

export default GetQuestions