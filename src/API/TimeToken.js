import axios from "axios";
import host from '../settings/host'

class TimeToken {
    static async post(access_token, setError) {
        try {
            const s = "Bearer " + access_token
            const token = await axios.post(`${host}/api/token/refresh/`,
                {"refresh": localStorage.getItem('refreshToken')},
                {headers: {"Authorization": s}})
            localStorage.setItem('accessToken', token.data['access'])

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

export default TimeToken