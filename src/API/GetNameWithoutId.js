import axios from "axios";
import host from '../settings/host'

class GetNameWithoutId {
    static async get(access_token, setPersonName, setError) {
        try {
            const s = "Bearer " + access_token
            const person_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            const person = await axios.get(`${host}/api/persons/${person_id.data}`, {headers: {"Authorization": s}})
            setPersonName(person.data["last_name"] + ' ' + person.data["first_name"] + ' ' + person.data["middle_name"])
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

export default GetNameWithoutId