import axios from "axios";
import host from '../settings/host'

class GetQuestions {
    static async get(access_token, setQuestions, setError) {
        try {
            const s = "Bearer "+access_token
            const person_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            const questions = await axios.get(`${host}/api/questions/`, {headers: {"Authorization": s}})
            const person_questions = []
            for (let i = 0; i < questions.data.length; i++) {
                if(questions.data[i]["owner"] === person_id.data)
                    person_questions.push(questions.data[i])
            }
            setQuestions( person_questions.reverse())
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