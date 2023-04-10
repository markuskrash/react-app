import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class PostAnswer {
    static async post(access_token, setAnswer, id) {
        try {
            const s = "Bearer "+access_token
            const answers = await axios.get('http://127.0.0.1:8000/api/answers/', {headers: {"Authorization": s}})
            for (let i = 0; i < answers.data.length; i++) {
                if(answers.data[i]["question"] === id) {
                    setAnswer(answers.data[i]["text"])
                }
            }


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

export default PostAnswer