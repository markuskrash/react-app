import React, {useContext, useEffect, useState} from "react";
import classes from "./OneAnswer.module.css"
import {NavDropdown, Nav, Modal, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useRequest from "../../../hooks/useRequest";
import GetAnswers from "../../../API/GetAnswers";


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
    } = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        if (status === "1") {
            request_make_answer();
        }
    }

    const [answer, setAnswer] = useState("");

    const [request_make_answer] = useRequest(async (access_token) => {
        await GetAnswers.get(access_token, setAnswer, id)
    })

    return (
        <div>
            <div className={classes.answer}>
                <p className={classes.answer_text}>{text}</p>
                <div className={classes.make_answer}>
                    <Button className={classes.make_answer_btn} variant='light' onClick={handleShow}>
                        <FormattedMessage id='make_answer'/>
                    </Button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        {status === "0"?
                            <FormattedMessage id='wait_answer'/>
                        :
                            answer
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