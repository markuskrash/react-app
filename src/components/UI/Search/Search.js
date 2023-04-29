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
import classes from './Search.module.css'
import Teachers from "../../../API/Teachers";
import APIAsk from "../../../API/Ask"


const Search = () => {
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


    // const [question, setQuestion] = useState("");


    return (
        <>
            {isAuth ?
                <div className={classes.search}>

                    <Form.Control
                        as='input'
                        className={classes.search_input}
                        maxLength="50"
                        onChange={(e) => {
                                            setFilter(e.target.value)
                                        }}
                    />
                    {/*<Form.Label className={classes.search_label}>*/}
                    {/*    <FormattedMessage id='max_length'/>*/}
                    {/*    {": "}*/}
                    {/*    {50 - question.length}*/}
                    {/*</Form.Label>*/}
                </div>
                : ""
            }
        </>

    )
}

export default Search