import React, {useContext, useEffect, useState} from "react";
import classes from "./Answers.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
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
        setError
    } = useContext(AuthContext)

    const [questions, setQuestions] = useState([]);

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestionsForAnswer.get(access_token, setQuestions, setError)
    })

    useEffect(() => {
        if (isAuth) {
            request_questions()
        }
    }, [isAuth, renderAnswers])


    return (
        <div>
            {isAuth === true && isTeacher === true ?
                questions.map(question => (
                    <OneQuestionsForAnswer text={question['text']} status={question['status']} owner={question['owner']}
                                           id={question['id']} is_anonymous={question['anonymous']}/>
                ))

                : ""

            }
        </div>
    )
}

export default Answers