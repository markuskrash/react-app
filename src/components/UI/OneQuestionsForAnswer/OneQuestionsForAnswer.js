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
import GetAnswer from "../../../API/GetAnswer";
import PostAnswer from "../../../API/PostAnswer";
import GetPersonId from "../../../API/GetNameWithoutId";
import Status from "../../../API/Status";
import GetName from "../../../API/GetName";


const OneQuestionsForAnswer = ({text, status, owner, id, is_anonymous, is_public}) => {
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

    const handleClose = () => {
        setShow(false);
        setTextAnswer(lastTextAnswer)
        if(status==='0')setLastTextAnswer('')
    }
    const handleShow = () => {
        setShow(true);
        if(status==='0')setLastTextAnswer('')
    }

    useEffect(() => {
        request_name()
        if (status === '1') {
            request_last_answer()
        }
    }, [])

    useEffect(() => {
        if (status === '1') {
            request_last_answer()
        }
    }, [status, renderAnswers])

    const [textAnswer, setTextAnswer] = useState("");

    const [lastTextAnswer, setLastTextAnswer] = useState("");

    useEffect(() => {
        setTextAnswer(lastTextAnswer)
    }, [lastTextAnswer])

    const [request_make_answer] = useRequest(async (access_token) => {
        await PostAnswer.post(access_token, textAnswer, owner, id, setIsTryToAnswer, handleClose, setTextAnswer, renderAnswers, setRenderAnswers, status)
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

    const [personName, setPersonName] = useState('');

    const [request_name] = useRequest(async (access_token) => {
        await GetName.get(access_token, setPersonName, owner, setError)
    })

    // const [status, setStatus] = useState('');
    //
    // const [request_status] = useRequest(async (access_token) => {
    //     await Status.get(access_token, id, setStatus)
    // })
    //
    //
    // useEffect(() => {
    //     if (isAuth && isTeacher) {
    //         request_status()
    //     }
    // }, [])


    const [request_last_answer] = useRequest(async (access_token) => {
        await GetAnswer.get(access_token, setLastTextAnswer, id, setError)
    })

    return (
        <div>
            <div className={classes.answer}>
                <div>
                    {is_public ?
                        is_anonymous ?
                            <p className={classes.question_text}>
                                <FormattedMessage id='student_question_public_anonymous'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                            :
                            <p className={classes.question_text}>
                                {personName} <FormattedMessage id='student_question_public'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                        :
                        <p className={classes.question_text}>
                            {personName} <FormattedMessage id='student_question'/>:{' '}
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{text}
                        </p>
                    }
                    {status === '1' ?
                        <p className={classes.answer_text}>
                            <FormattedMessage id='your_answer'/>:{' '}
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{textAnswer}
                        </p>
                        :
                        ''
                    }
                </div>
                <div className={classes.make_answer}>
                    <Button className={classes.make_answer_btn} variant='info' onClick={handleShow}>
                        {status === '1' ?
                            <FormattedMessage id='change_answer'/>
                            :
                            <FormattedMessage id='make_answer'/>
                        }
                    </Button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form noValidate onSubmit={sumbit}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            {is_public ?
                                is_anonymous ?
                                    <>
                                        <FormattedMessage id='student_question_public_anonymous'/>:{' '}
                                        <br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{text}
                                    </>
                                    :
                                    <>
                                        {personName} <FormattedMessage id='student_question_public'/>:{' '}
                                        <br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{text}
                                    </>
                                :
                                <>
                                    {personName} <FormattedMessage id='student_question'/>:{' '}
                                    <br/>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{text}
                                </>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label><FormattedMessage id='your_answer'/></Form.Label>
                            <Form.Control
                                required
                                autoFocus
                                as='textarea'
                                maxlength='50'
                                value={status === '1' ?
                                    textAnswer
                                    :
                                    null
                                }
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
                        <Button variant="info" type='submit'>
                            {status === '1' ?
                                <FormattedMessage id='save_changes'/>
                                :
                                <FormattedMessage id='make_answer'/>
                            }
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default OneQuestionsForAnswer