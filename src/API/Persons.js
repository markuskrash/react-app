import axios from "axios";

class Persons {
    static async get(){
        try{
            const persons = await axios.get('http://127.0.0.1:8000/api/persons/')
            return persons.data
        }catch (event){
            console.log(event)
        }
    }
}

export default Persons