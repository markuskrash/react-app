import axios from "axios";
import {useContext, useState} from "react";
import AuthContext from "../context";

const useRequest = (callback, is_lazy = false, question = 10000000000000) => {
        const {
            isAuth,
            setIsAuth,
            isLoading,
            setIsLoading,
            locale,
            setLocale,
            renderQuestions,
            setRenderQuestions,
            isTeacher,
            setIsTeacher,
            renderAnswers,
            setRenderAnswers,
            error,
            setError,
            filter,
            setFilter,
        } = useContext(AuthContext)
        // async const error = ''

        const request = async () => {
            setIsLoading(true)
            await callback(localStorage.getItem("accessToken"))
            setIsLoading(false)
        }


        return [request]

// const request = (method, path, data, callback) => {
//     const local_callback = (response) => {
//         setIsLoading(false);
//         callback(response);
//     }
//
//     setIsLoading(true);
//
//     const make_query = (data) => {
//         return '?' + Object.entries(data).map(([k, v]) => {
//             return ${k}=${v}
//         }).join('&');
//     };
//
//     axios({
//         method: method || 'post',
//         url: //${Consts.api_url}/api/${path}${method === 'get' ? make_query(data) : ''},
//         data: data
//     })
//         // .post(`//${Consts.api_url}/api/${path}`, data)
//         .then(local_callback)
//         .catch((error) => local_callback(error.response));
// }

// return [isLoading, request];
    }
;

export default useRequest;