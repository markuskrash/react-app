import axios from "axios";
import host from '../settings/host'

class GetTeacherId {
    static async get(access_token, setPersonEmail, id) {
        try {
            const s = "Bearer " + access_token
            const persons = await axios.get(`${host}/api/persons/`, {headers: {"Authorization": s}})
            // console.log(person_id, persons)
            for (let i = 0; i < persons.data.length; i++) {
                if(persons.data[i]["id"] === id)
                    setPersonEmail(persons.data[i]["email"])
            }

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

export default GetTeacherId