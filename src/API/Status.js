import axios from "axios";
import host from '../settings/host'

class Status {
    static async get(access_token, question, setStatus) {
        try {
            const s = "Bearer "+access_token
            const status = await axios.get(`${host}/api/questions/${question}/`, {headers: {"Authorization": s}})
            setStatus(status.data)
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

export default Status