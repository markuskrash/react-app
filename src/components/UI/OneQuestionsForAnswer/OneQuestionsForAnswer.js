import React, {useContext, useEffect, useState} from "react";
import classes from "./OneQuestionsForAnswer.module.css"
import {NavDropdown, Nav, Modal, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useRequest from "../../../hooks/useRequest";
import GetAnswers from "../../../API/GetAnswers";
import PostAnswer from "../../../API/PostAnswer";
import GetPersonId from "../../../API/GetPersonId";


const OneQuestionsForAnswer = ({text, status, owner, id}) => {
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
        request_email()
    }

    const [textAnswer, setTextAnswer] = useState("");

    const [request_make_answer] = useRequest(async (access_token) => {
        await PostAnswer.post(access_token, textAnswer, owner, id, setIsTryToAnswer, handleClose)
    })

    const [isTryToAnswer, setIsTryToAnswer] = useState(false);

    const answer = (event) => {
        request_make_answer()
    }

    const sumbit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
        }
        answer(event)

    }

    const [personEmail, setPersonEmail] = useState('');

    const [request_email] = useRequest(async (access_token) => {
        await GetPersonId.get(access_token, setPersonEmail)
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
                    <Form noValidate onSubmit={sumbit}>
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <Form.Label>
                                        <FormattedMessage id='student_question'/> {personEmail}:
                                    </Form.Label>
                                    <br/>
                                    <Form.Text>{text}</Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="validationCustom02">
                                    <Form.Label><FormattedMessage id='your_answer'/></Form.Label>
                                    <Form.Control
                                        required
                                        autoFocus
                                        as='textarea'
                                        maxlength='50'

                                        className={classes.inputInfo}
                                        onChange={(e) => {
                                            setTextAnswer(e.target.value)
                                        }}
                                    />
                                    <Form.Label>
                                        <FormattedMessage id='max_length'/>
                                        {": "}
                                        {50 - textAnswer.length}
                                    </Form.Label>
                                </Form.Group>
                                <Alert variant='danger' show={isTryToAnswer}>
                                    <div className={classes.alertText}>
                                        {isTryToAnswer
                                            ? <FormattedMessage id='answer_alert'/>
                                            : ''
                                        }
                                    </div>
                                </Alert>
                            </Modal.Body>
                            <Modal.Footer>
                        <Button variant="dark" type='submit' >
                            <FormattedMessage id='make_answer'/>
                        </Button>
                    </Modal.Footer>
                        </Form>
            </Modal>
        </div>
    )
}

export default OneQuestionsForAnswer