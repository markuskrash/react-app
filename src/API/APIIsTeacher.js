import axios from "axios";
import host from '../settings/host'


class APIIsTeacher {
    static async get(access_token, setIsTeacher, setError) {
        try {
            const s = "Bearer " + access_token
            const person_id = await axios.get(`${host}/api/token/get/`, {headers: {"Authorization": s}})
            const persons = await axios.get(`${host}/api/persons/`, {headers: {"Authorization": s}})
            for (let i = 0; i < persons.data.length; i++) {
                if(persons.data[i]["id"] === person_id.data) {
                    if (persons.data[i]["sub"] === "1") {
                        setIsTeacher(true)
                    }else if(persons.data[i]["sub"] === "0"){
                        setIsTeacher(false)
                    }
                }
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

export default APIIsTeacher