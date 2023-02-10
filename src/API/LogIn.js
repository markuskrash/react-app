import axios from "axios";

class LogIn {
    static async post(email, password, setIsAuth, setIsTryToAuth, handleClose) {

        try {
            setIsTryToAuth(true)
            const persons = await axios.post('http://127.0.0.1:8000/api/token/', {'email': email, 'password': password})
            handleClose()
            localStorage.setItem('email', email)
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
            localStorage.setItem('error', event.message)
        }
    }
}

export default LogIn