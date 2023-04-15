import axios from "axios";
import host from '../settings/host'

class GetAnswers {
    static async get(access_token, setAnswer, id) {
        try {
            const s = "Bearer "+access_token
            const answers = await axios.get(`${host}/api/answers/`, {headers: {"Authorization": s}})
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
            localStorage.setItem('error', event.response.data)
        }
    }
}

export default GetAnswers