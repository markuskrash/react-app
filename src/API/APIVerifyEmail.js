import axios from "axios";
import host from '../settings/host'

class APIVerifyEmail {
    static async post(uuid) {

        try {
            const verify = await axios.post(`${host}/api/verifyemail/${uuid}`)
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

export default APIVerifyEmail