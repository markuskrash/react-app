import axios from "axios";
import host from '../settings/host'

class GetQuestionsForAnswer {
    static async get(access_token, setQuestions, setError) {
        try {
            const s = "Bearer "+access_token
            const teacher_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            const questions = await axios.get(`${host}/api/questions/`, {headers: {"Authorization": s}})
            const teacher_questions = []
            for (let i = 0; i < questions.data.length; i++) {
                if(questions.data[i]["reciever"] === teacher_id.data)
                    teacher_questions.push(questions.data[i])
            }

            setQuestions(teacher_questions.reverse())
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