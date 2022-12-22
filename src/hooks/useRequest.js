import axios from "axios";
import {useState} from "react";

const useRequest = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const request = async () =>{
        try{
            setIsLoading(true)
            await callback()
        }catch (e){
            setError(e.message)
        }finally {
            setIsLoading(false)
        }
    }
    return [isLoading, error, request]

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
};

export default useRequest;