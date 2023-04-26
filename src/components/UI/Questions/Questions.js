import React, {useContext, useEffect, useState} from "react";
import classes from "./Questions.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";


const Questions = () => {
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

    const [questions, setQuestions] = useState([]);

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestions.get(access_token, setQuestions, setError)
    })

    useEffect(() => {
        if (isAuth) {
            request_questions()
        }
    }, [renderQuestions, isAuth])

    useEffect(() => {
        console.log(questions)
    }, [questions])


    return (
        <div>
            {isAuth === true && isTeacher === false ?
                questions.map(question => (
                    <OneQuestion text={question['text']} status={question['status']} reciever={question['reciever']}
                                 id={question['id']} owner={question['owner']} is_anonymous={question['anonymous']}
                                 is_public={question['public']}/>
                ))

                : ""

            }
        </div>
    )
}

export default Questions