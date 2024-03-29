import axios from "axios";
import host from '../settings/host'

class SignUp {
    static async post(email, password, surname, first_name, second_name, position, setIsAuth, setIsTryToSign, handleClose, setPosition) {

        try {
            setIsTryToSign(true)
            const register = await axios.post(`${host}/api/register`, {
                'email': email,
                'password': password,
                'last_name': surname,
                'first_name': first_name,
                'middle_name': second_name,
                'sub': position
            })
            setIsTryToSign(false)
            handleClose()
            setPosition('1')
            localStorage.setItem('email', email)
            localStorage.setItem('error', '')

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

export default SignUp