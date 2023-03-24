import axios from "axios";

class SignUp {
    static async post(access_token, setIsTryToAsk, text, anonymous, reciever, handleClose) {

        try {
            setIsTryToAsk(true)
            const s = "Bearer "+access_token
                const question = await axios.post('http://127.0.0.1:8000/api/questions/post/', {
                'text': text,
                'status': 0,
                'owner': 7,
                'reciever': reciever,
                'public': !anonymous,
            }, {headers: {"Authorization": s}})

            handleClose()
            setIsTryToAsk(false)
            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

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

export default SignUp