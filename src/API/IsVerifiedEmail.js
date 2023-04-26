import axios from "axios";
import host from '../settings/host'

class IsVerifiedEmail {
    static async get(uuid, setError, setIsVerifiedEmail, setIsStaff, setSub) {

        try {
            const is_verified = await axios.get(`${host}/api/verifyemail/${uuid}`)
            setIsVerifiedEmail(is_verified.data[0])
            setIsStaff(is_verified.data[1])
            setSub(is_verified.data[2])
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