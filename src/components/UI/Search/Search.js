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
import classes from './Search.module.scss'
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

    // const [request] = useRequest(async (access_token) => {
    //     await APIAsk.post(access_token, setIsTryToAsk, question, anonymous, reciever, handleClose, renderQuestions,
    //         setRenderQuestions, setAnonymous, isPublic, setIsPublic)
    // })

    const [tempFilter, setTempFilter] = useState('');

    const sumbit = () => {
        setFilter(tempFilter)
    }

    return (
        <>
            {isAuth ?
                <div className={classes.search}>
                    {/*<Form noValidate onSubmit={sumbit}>*/}
                    <Form.Control
                        placeholder={messages[locale]['search']}
                        as='input'
                        className={classes.search_input}
                        maxLength="50"
                        onChange={(e) => {
                            setTempFilter(e.target.value)
                        }}
                    />
                    <Button className={classes.search_btn} variant='info' onClick={sumbit}><FormattedMessage
                        id='search'/></Button>
                    {/*</Form>*/}
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