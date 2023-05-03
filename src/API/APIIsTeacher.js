import axios from "axios";
import host from '../settings/host'


class APIIsTeacher {
    static async get(access_token, setIsTeacher, setError) {
        try {
            const s = "Bearer " + access_token
            const is_teacher = await axios.get(`${host}/api/persons/is_teacher/`, {headers: {"Authorization": s}})
            console.log(is_teacher.data)
            setIsTeacher(is_teacher.data)
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