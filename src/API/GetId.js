import axios from "axios";
import host from '../settings/host'

class GetId {
    static async get(access_token, setPersonId, setError) {
        try {
            const s = "Bearer " + access_token
            const person_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            setPersonId(person_id.data)

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

export default GetId