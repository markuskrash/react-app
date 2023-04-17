import axios from "axios";
import host from '../settings/host'

class GetPersonId {
    static async get(access_token, setPersonEmail, setError) {
        try {
            const s = "Bearer " + access_token
            const person_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            const persons = await axios.get(`${host}/api/persons/`, {headers: {"Authorization": s}})
            // console.log(person_id, persons)
            for (let i = 0; i < persons.data.length; i++) {
                if(persons.data[i]["id"] === person_id.data)
                    setPersonEmail(persons.data[i]["email"])
            }

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

export default GetPersonId