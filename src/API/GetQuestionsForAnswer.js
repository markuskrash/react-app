import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class GetQuestionsForAnswer {
    static async get(access_token, setQuestions) {
        try {
            const s = "Bearer "+access_token
            const teacher_id = await axios.get('http://127.0.0.1:8000/api/token/get/', {headers: {"Authorization": s}})
            const questions = await axios.get('http://127.0.0.1:8000/api/questions/', {headers: {"Authorization": s}})
            const teacher_questions = []
            for (let i = 0; i < questions.data.length; i++) {
                if(questions.data[i]["reciever"] === teacher_id.data)
                    teacher_questions.push(questions.data[i])
            }

            setQuestions(teacher_questions)
            return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            // setIsAuth(false)
            localStorage.setItem('error', event.message)
        }
    }
}

export default GetQuestionsForAnswer