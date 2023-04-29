import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import Teachers from "../../../API/Teachers";
import APIVerifyEmail from "../../../API/APIVerifyEmail";
import AuthContext from "../../../context";
import IsVerifiedEmail from "../../../API/IsVerifiedEmail";
import {Alert} from "react-bootstrap";
import classes from "./VerifyEmail.module.css";
import {FormattedMessage} from "react-intl";


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
    const [isStaff, setIsStaff] = useState(0)
    const [sub, setSub] = useState(0)
    const [request_is_verified] = useRequest(async () => {
        await IsVerifiedEmail.get(uuid, setError, setIsVerified, setIsStaff, setSub)
    })

    useEffect(() => {
        request_is_verified()
    }, [])

    useEffect(() => {
        if (isVerified === 0) {
            request_verify()
        }
    }, [isVerified])

    return (
        <div className={classes.alert}>
            {error !== "" ?
                <Alert variant='danger'><FormattedMessage id='alert'/></Alert>
                :
                isVerified === 0 ?
                    sub === '1' && isStaff === true ?
                        <Alert variant='success'>
                            <FormattedMessage id='success_verify_teacher_admin'/>
                            &nbsp;
                            <a href={'http://localhost:3000/'}><FormattedMessage id='success_verify_text'/></a>
                        </Alert>
                        :
                        isStaff === true ?
                            <Alert variant='success'>
                                <FormattedMessage id='success_verify_teacher'/>
                                &nbsp;
                                <a href={'http://localhost:3000/'}><FormattedMessage id='success_verify_text'/></a>
                            </Alert>
                            :
                            <Alert variant='success'>
                                <FormattedMessage id='success_verify'/>
                                &nbsp;
                                <a href={'http://localhost:3000/'}><FormattedMessage id='success_verify_text'/></a>
                            </Alert>
                    :
                    <Alert variant='danger' ><FormattedMessage id='alert'/></Alert>

            }
        </div>
    )
}

export default VerifyEmail