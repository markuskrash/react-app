import axios from "axios";

class Teachers {
    static async get(setTeachers, setReciever) {


        try {
            const persons = await axios.get('http://127.0.0.1:8000/api/persons/')
            const teachers = []
            for (let i = 0; i < persons.data.length; i++) {
                if (persons.data[i]["is_staff"] === true) {
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
            localStorage.setItem('error', event.message)
        }
    }
}

export default Teachers