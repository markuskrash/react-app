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

    useEffect(() => {
        if (isAuth) {
            request_questions()
        }
    }, [renderQuestions, isAuth])

    useEffect(() => {
        setQuestionsFilter(questions)
        setQuestionsFilter(questions.filter(question => question['text'].indexOf(filter) >= 0))
    }, [questions])

    useEffect(() => {
        console.log(filter)
        setQuestionsFilter(questions.filter(question => question['text'].indexOf(filter) >= 0))
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