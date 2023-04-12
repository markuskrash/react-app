import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class Status {
    static async get(access_token, question, setStatus) {
        try {
            const s = "Bearer "+access_token
            const status = await axios.get(`http://127.0.0.1:8000/api/questions/${question}/`, {headers: {"Authorization": s}})
            setStatus(status.data)
            return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            // setIsAuth(false)
            // localStorage.setItem('error', event.message)
        }
    }
}

export default Status