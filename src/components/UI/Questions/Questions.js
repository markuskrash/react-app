import React, {useContext, useEffect, useState} from "react";
import classes from "./Questions.module.css"
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";
import GetQuestionsFilter from "../../../API/GetQuestionsFilter";


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
        setError,
        filter,
        setFilter,
    } = useContext(AuthContext)

    const [questions, setQuestions] = useState([]);
    const [questionsFilter, setQuestionsFilter] = useState([]);

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestions.get(access_token, setQuestions, setError)
    })

    const [request_questions_filter] = useRequest(async (access_token) => {
        await GetQuestionsFilter.get(access_token, setQuestionsFilter, filter, setError)
    })

    useEffect(() => {
        if (isAuth) {
            request_questions()
        }
    }, [renderQuestions, isAuth])

    useEffect(() => {
        setQuestionsFilter(questions)
    }, [questions])

    useEffect(() => {
        if(isAuth)
            request_questions_filter();
    }, [filter])


    return (
        <div>
            {isAuth === true && isTeacher === false ?
                questions.length > 0 ?
                questionsFilter.map(question => (
                    <OneQuestion text={question['text']} status={question['status']} reciever={question['reciever']}
                                 id={question['id']} owner={question['owner']} is_anonymous={question['anonymous']}
                                 is_public={question['public']}/>
                ))
                    :
                    <div className={classes.questions}>
                    <Alert variant='primary'><FormattedMessage id='questions_info'/></Alert>
                    </div>
                : ""

            }
        </div>
    )
}

export default Questions