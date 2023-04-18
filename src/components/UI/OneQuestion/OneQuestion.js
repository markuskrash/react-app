import React, {useContext, useEffect, useState} from "react";
import classes from "./OneQuestion.module.css"
import {NavDropdown, Nav, Modal, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useRequest from "../../../hooks/useRequest";
import GetAnswers from "../../../API/GetAnswers";
import GetPersonId from "../../../API/GetPersonId";
import GetTeacherId from "../../../API/GetTeacherId";


const OneQuestion = ({text, status, reciever, id}) => {
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        if (status === "1") {
            request_answers();
            request_email()
        }
    }

    const [answer, setAnswer] = useState("");

    const [request_answers] = useRequest(async (access_token) => {
        await GetAnswers.get(access_token, setAnswer, id, setError)
    })

    const [personEmail, setPersonEmail] = useState('');

    const [request_email] = useRequest(async (access_token) => {
        await GetTeacherId.get(access_token, setPersonEmail, reciever, setError)
    })

    return (
        <div>
            <div className={classes.question}>
                <p className={classes.question_text}>
                    <FormattedMessage id='your_question'/>
                    {text}
                </p>
                <div className={classes.answer}>
                    <Button className={classes.answer_btn} variant='light' onClick={handleShow}>
                        <FormattedMessage id='answer'/>
                    </Button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {status === "0" ?
                        <FormattedMessage id='wait_answer'/>
                        :
                        <>
                            <FormattedMessage id='teacher_answer'/> {personEmail}:

                            <br/>
                            {answer}
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" type='submit' onClick={handleClose}>
                        <FormattedMessage id='close'/>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OneQuestion