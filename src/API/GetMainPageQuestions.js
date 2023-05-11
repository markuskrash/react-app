import axios from "axios";
import host from '../settings/host'

class GetMainPageQuestions {
    static async get(access_token, setQuestions, page, setTotalCount, setError) {
        try {
            const questions = await axios.get(`${host}/api/questions/for_all/?page=${page}`)
            setQuestions( questions.data['results'])
            setTotalCount(questions.data['count'])
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

export default GetMainPageQuestions