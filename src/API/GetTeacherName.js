import axios from "axios";
import host from '../settings/host'

class GetTeacherName {
    static async get(access_token, setPersonName, id, setError) {
        try {
            const s = "Bearer " + access_token
            const person = await axios.get(`${host}/api/persons/${id}`, {headers: {"Authorization": s}})
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

export default GetTeacherName