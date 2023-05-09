import React, {useContext, useEffect, useState} from "react";
import {NavDropdown, Nav, Alert, Card} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import classes from './SearchAndAsk.module.css'
import Teachers from "../../../API/Teachers";
import APIAsk from "../../../API/Ask"
import Search from "../Search/Search";
import Ask from "../Ask/Ask";
import GetNameWithoutId from "../../../API/GetNameWithoutId";


const SearchAndAsk = () => {
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


    const [personEmail, setPersonEmail] = useState('');
    const [persons, setPersons] = useState('');

    const [request_email] = useRequest(async (access_token) => {
        await GetNameWithoutId.get(access_token, setPersonEmail, setError)
    })


    useEffect(() => {
        if (isAuth) {
            request_email()
        }
    }, [isAuth])

    return (
        <>
            {isAuth ?
                <div>
                    <Card className={classes.about} bg='secondary'>
                        <Card.Body>
                            <Card.Title className={classes.about_tittle}>
                                <FormattedMessage id='about_welcome'/>{' ' + personEmail}
                            </Card.Title>
                            <div className={classes.about_ask}>
                                {isTeacher ?
                                    <FormattedMessage id='about_teacher'/>
                                    :
                                    <FormattedMessage id='about_student'/>
                                }
                            </div>
                            <Ask/>
                        </Card.Body>
                    </Card>

                    <div className={classes.search_and_ask}>

                        <Search/>

                    </div>
                </div>
                : ""
            }
        </>

    )
}

export default SearchAndAsk