import axios from "axios";
import host from '../settings/host'

class CountAnswers {
    static async get(access_token, setCountAnswers, question, setError) {
        try {
            const s = "Bearer " + access_token
            const count = await axios.get(`${host}/api/answers/count/${question}`, {headers: {"Authorization": s}})
            setCountAnswers(count.data)
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

export default CountAnswers