import axios from "axios";


class APIIsTeacher {
    static async get(access_token, setIsTeacher) {
        try {
            const s = "Bearer " + access_token
            const person_id = await axios.get('http://127.0.0.1:8000/api/token/get/', {headers: {"Authorization": s}})
            const persons = await axios.get('http://127.0.0.1:8000/api/persons/')
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
            localStorage.setItem('error', event.message)
        }
    }
}

export default APIIsTeacher