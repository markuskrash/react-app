import axios from "axios";
import host from '../settings/host'

class GetAnswer {
    static async get(access_token, setAnswer, id, setError) {
        try {

            const s = "Bearer " + access_token
            const answer = await axios.get(`${host}/api/answers/${id}`)
            setAnswer(answer.data)
            // console.log(23, id, answer)


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

export default GetAnswer