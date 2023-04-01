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
        setRenderQuestions
    } = useContext(AuthContext)

    const [questions, setQuestions] = useState([]);

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestions.get(access_token, setQuestions, setRenderQuestions)
    })

    useEffect(() => {
        if (isAuth) {
            console.log(1)
            request_questions()
            console.log(questions)
        }
    }, [renderQuestions, []])


    return (
        <div>
            {isAuth === true ?
                questions.map(question => (
                    <OneQuestion text={question['text']} status={question['status']}/>
                ))

                : ""

            }
        </div>
    )
}

export default Questions