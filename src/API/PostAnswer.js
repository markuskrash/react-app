import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class PostAnswer {
    static async post(access_token,text, owner, question, setIsTryToAnswer, handleClose) {
        try {
            const s = "Bearer "+access_token
            setIsTryToAnswer(true)
            const answer = await axios.post('http://127.0.0.1:8000/api/answers/post/',
                {text: text,
                    owner: owner,
                    question: question,
                },
                {headers: {"Authorization": s}})
            setIsTryToAnswer(false)
            handleClose()
            // for (let i = 0; i < answers.data.length; i++) {
            //     if(answers.data[i]["question"] === id) {
            //         setAnswer(answers.data[i]["text"])
            //     }
            // }


            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

            return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            // setIsAuth(false)
            // localStorage.setItem('error', event.message)
        }
    }
}

export default PostAnswer