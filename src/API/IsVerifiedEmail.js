import axios from "axios";
import host from '../settings/host'

class IsVerifiedEmail {
    static async get(uuid, setError, setIsVerifiedEmail) {

        try {
            const is_verified = await axios.get(`${host}/api/verifyemail/${uuid}`)
            setIsVerifiedEmail(is_verified.data)
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

export default IsVerifiedEmail