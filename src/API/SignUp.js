import axios from "axios";

class SignUp {
    static async post(email, password, surname, first_name, second_name, standing, setIsAuth, setIsTryToSign, handleClose) {

        try {
            setIsTryToSign(true)
            const register = await axios.post('http://127.0.0.1:8000/api/register', {
                'email': email,
                'password': password,
                'last_name': surname,
                'first_name': first_name,
                'middle_name': second_name,
                'sub': standing
            })

            handleClose()
            localStorage.setItem('email', email)
            localStorage.setItem('error', '')

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

export default SignUp