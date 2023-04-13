import axios from "axios";
import {useContext} from "react";
import AuthContext from "../context";

class TimeToken {
    static async post(access_token) {
        try {
            const s = "Bearer " + access_token
            const token = await axios.post('http://127.0.0.1:8000/api/token/refresh/',
                {"refresh": localStorage.getItem('refreshToken')},
                {headers: {"Authorization": s}})
            localStorage.setItem('accessToken', token.data['access'])

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

export default TimeToken