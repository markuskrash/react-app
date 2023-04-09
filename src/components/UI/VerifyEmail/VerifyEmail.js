import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import Teachers from "../../../API/Teachers";
import APIVerifyEmail from "../../../API/APIVerifyEmail";


const VerifyEmail = () => {
    const {uuid} = useParams()

    const [request_verify] = useRequest(async () => {
        await APIVerifyEmail.post(uuid)
    })

    useEffect(() => {
        request_verify()
    }, [])

    return (
        <>
            <h>{localStorage.getItem('error')}</h>
        </>
    )
}

export default VerifyEmail