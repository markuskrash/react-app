import axios from "axios";
import host from '../settings/host'

class GetMainPageQuestionsFilter {
    static async get(access_token, setQuestions, renderQuestion, setRenderQuestion, filter, page, setPage, setTotalCount, setError) {
        try {
            if (setPage) {
                setPage(1)
                const questions = await axios.post(`${host}/api/questions/for_all/filter/?page=1`, {
                    'filter': filter,
                })
                setQuestions(questions.data['results'])
                setRenderQuestion(renderQuestion + 1)
                setTotalCount(questions.data['count'])
            } else {
                const questions = await axios.post(`${host}/api/questions/for_all/filter/?page=${page}`, {
                    'filter': filter,
                })
                setQuestions(questions.data['results'])
                setRenderQuestion(renderQuestion + 1)
                setTotalCount(questions.data['count'])
            }

            // localStorage.setItem('email', email)
            // localStorage.setItem('error', '')

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

export default GetMainPageQuestionsFilter