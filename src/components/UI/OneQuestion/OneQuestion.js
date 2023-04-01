import React, {useContext, useState} from "react";
import classes from "./OneQuestion.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";


const OneQuestion = ({text, status, reciever}) => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale, renderQuestions, setRenderQuestions} = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className={classes.question}>
            <h1>text</h1>
            <div className={classes.answer}>
                <Button className={classes.answer_btn} variant='light' onClick={handleShow}>
                    <FormattedMessage id='answer'/>
                </Button>
            </div>
        </div>
    )
}

export default OneQuestion