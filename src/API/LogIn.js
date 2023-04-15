import axios from "axios";
import host from '../settings/host'

class LogIn {
    static async post(email, password, setIsAuth, setIsTryToAuth, handleClose) {

        try {
            setIsTryToAuth(true)
            console.log(host)
            const persons = await axios.post(`${host}/api/token/`, {'email': email, 'password': password})
            handleClose()
            localStorage.setItem('accessToken', persons.data['access'])
            localStorage.setItem('refreshToken', persons.data['refresh'])
            localStorage.setItem('error', '')
            setIsAuth(true)

            // return 0;

        } catch (event) {
            // setValidated(false)
            // event.stopPropagation()
            //
            setIsAuth(false)
            // localStorage.setItem('error', event.message)
        }
    }
}

export default LogIn