import axios from "axios";
import host from '../settings/host'

class APIAsk {
    static async post(access_token, setIsTryToAsk, text, anonymous, reciever, handleClose, renderQuestions,
                      setRenderQuestions, setAnonymous, isPublic, setIsPublic) {

        try {
            setIsTryToAsk(true)
            const s = "Bearer " + access_token
            const question = await axios.post(`${host}/api/questions/post/`, {
                'text': text,
                'status': 0,
                // 'owner': 7,
                'reciever': reciever,
                'public': isPublic,
                'anonymous': anonymous,
            }, {headers: {"Authorization": s}})
            setRenderQuestions(renderQuestions + 1)
            handleClose()
            setIsTryToAsk(false)
            setAnonymous(false)
            setIsPublic(false)
            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

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

export default APIAsk