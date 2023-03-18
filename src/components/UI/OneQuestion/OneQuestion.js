import React, {useContext, useState} from "react";
import classes from "./OneQuestion.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";


const OneQuestion = () => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale} = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className={classes.question}>
            <div className={classes.answer}>
                <Button className={classes.answer_btn} variant='light' onClick={handleShow}>
                    <FormattedMessage id='answer'/>
                </Button>
            </div>
        </div>
    )
}

export default OneQuestion