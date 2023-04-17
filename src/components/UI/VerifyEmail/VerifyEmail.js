import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import Teachers from "../../../API/Teachers";
import APIVerifyEmail from "../../../API/APIVerifyEmail";
import AuthContext from "../../../context";
import IsVerifiedEmail from "../../../API/IsVerifiedEmail";
import {Alert} from "react-bootstrap";
import classes from "./VerifyEmail.module.css";


const VerifyEmail = () => {
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
        setError
    } = useContext(AuthContext)

    const {uuid} = useParams()

    const [request_verify] = useRequest(async () => {
        await APIVerifyEmail.post(uuid, setError)
    })

    const [isVerified, setIsVerified] = useState(1)
    const [request_is_verified] = useRequest(async () => {
        await IsVerifiedEmail.get(uuid, setError, setIsVerified)
    })

    useEffect(() => {
        request_is_verified()
    }, [])

    useEffect(() => {
        if(isVerified === 0)
            request_verify()
    }, [isVerified])

    return (
        <div className={classes.alert}>
            {error !== "" ?
                <Alert>{error.response.data[0]}</Alert>
                :
                isVerified === 0 ?
                    <Alert variant='success'>Вы подтвердили регистрацию</Alert>
                    :
                    <Alert variant='dark'>Вы уже подтверждали регистрацию</Alert>

            }
        </div>
    )
}

export default VerifyEmail