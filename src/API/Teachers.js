import axios from "axios";
import host from '../settings/host'

class Teachers {
    static async get(access_token, setTeachers, setReciever) {


        try {
            const s = "Bearer "+access_token
            const persons = await axios.get(`${host}/api/persons/`, {headers: {"Authorization": s}})
            const teachers = []
            for (let i = 0; i < persons.data.length; i++) {
                if (persons.data[i]["sub"] === "1") {
                    teachers.push(persons.data[i])
                }
            }
            setTeachers(teachers)
            setReciever(teachers[0]["id"])
            localStorage.setItem('error', '')

            // return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            localStorage.setItem('error', event.response.data)
        }
    }
}

export default Teachers