import axios from "axios";
import host from '../settings/host'

class PostAnswer {
    static async post(access_token, text, owner, question, setIsTryToAnswer, handleClose, setTextAnswer, renderAnswers, setRenderAnswers, status) {
        try {
            const s = "Bearer " + access_token
            setIsTryToAnswer(true)
            const answer = await axios.post(`${host}/api/answers/post/${status}`,
                {
                    text: text,
                    owner: owner,
                    question: question,
                },
                {headers: {"Authorization": s}})
            const change_status = await axios.post(`${host}/api/questions/post/${question}/`, {}, {headers: {"Authorization": s}})
            setRenderAnswers(renderAnswers + 1)
            setIsTryToAnswer(false)
            setTextAnswer('')
            handleClose()
            // for (let i = 0; i < answers.data.length; i++) {
            //     if(answers.data[i]["question"] === id) {
            //         setAnswer(answers.data[i]["text"])
            //     }
            // }


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

export default PostAnswer