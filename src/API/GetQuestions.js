import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class GetQuestions {
    static async get(access_token, setQuestions) {
        try {
            const s = "Bearer "+access_token
            const person_id = await axios.get('http://127.0.0.1:8000/api/token/get/', {headers: {"Authorization": s}})
            const questions = await axios.get('http://127.0.0.1:8000/api/questions/', {headers: {"Authorization": s}})
            const person_questions = []
            for (let i = 0; i < questions.data.length; i++) {
                if(questions.data[i]["owner"] === person_id.data)
                    person_questions.push(questions.data[i])
            }

            setQuestions(person_questions)
            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

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

export default GetQuestions