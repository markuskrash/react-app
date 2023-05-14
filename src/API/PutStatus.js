import axios from "axios";
import host from '../settings/host'

class PutStatus {
    static async get(access_token, question, toStatus, setToStatus, renderAnswers, setRenderAnswers, setError) {
        try {
            const s = "Bearer "+access_token
            const change_status = await axios.post(`${host}/api/questions/post/${question}/to_${toStatus}/`, {}, {headers: {"Authorization": s}})
            if(toStatus === 2){

                const count = await axios.get(`${host}/api/answers/count/${question}`)
                if(count.data ){
                    setToStatus(1)
                }else{
                    setToStatus(0)
                }
            }else {
                setToStatus(3 - toStatus)
            }
            setRenderAnswers(renderAnswers+1)
            return 0;

        } catch (event) {
            setError(event)
            // setValidated(false)
            // event.stopPropagation()
            //
            // setIsAuth(false)
            // localStorage.setItem('error', event.message)
        }
    }
}

export default PutStatus