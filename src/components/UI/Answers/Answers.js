import React, {useContext, useEffect, useState} from "react";
import classes from "./Answers.module.css"
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";
import GetQuestionsForAnswer from "../../../API/GetQuestionsForAnswer";
import OneQuestionsForAnswer from "../OneQuestionsForAnswer/OneQuestionsForAnswer";


const Answers = () => {
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
        await GetQuestionsForAnswer.get(access_token, setQuestions, setError)
    })

    useEffect(() => {
        if (isAuth) {
            request_questions()
        }
    }, [isAuth, renderAnswers])

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
            {isAuth === true && isTeacher === true ?
                questions.length > 0 ?
                    questionsFilter.map(question => (
                        <OneQuestionsForAnswer text={question['text']} status={question['status']}
                                               owner={question['owner']}
                                               id={question['id']} is_anonymous={question['anonymous']}
                                               is_public={question['public']}/>
                    ))
                    :
                    <div className={classes.answers}>
                        <Alert variant='primary'><FormattedMessage id='answers_info'/></Alert>
                    </div>
                : ""

            }
        </div>
    )
}

export default Answers