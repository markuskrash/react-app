import axios from "axios";
import host from '../settings/host'

class Teachers {
    static async get(access_token, setTeachers, setReciever, setError) {


        try {
            const s = "Bearer "+access_token
            const teachers = await axios.get(`${host}/api/persons/teachers/`, {headers: {"Authorization": s}})
            setTeachers(teachers.data)
            setReciever(teachers.data[0]["id"])
            // return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            setError(event)
        }
    }
}

export default Teachers