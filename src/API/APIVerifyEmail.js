import axios from "axios";

class APIVerifyEmail {
    static async post(uuid) {

        try {
            const verify = await axios.post(`http://127.0.0.1:8000/api/verifyemail/${uuid}`)
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

export default APIVerifyEmail