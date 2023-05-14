import React, {useContext, useEffect, useState} from "react";
import classes from "./OneQuestionsForAnswer.module.css"
import {NavDropdown, Nav, Modal, Alert, Tooltip, OverlayTrigger} from "react-bootstrap";
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
import PutStatus from "../../../API/PutStatus";
import CountAnswers from "../../../API/CountAnswers";


const OneQuestionsForAnswer = ({text, status, owner, id, is_anonymous, is_public, renderAnswer, setRenderAnswer}) => {
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
        if (status === '0') setLastTextAnswer('')
    }
    const handleShow = () => {
        setShow(true);
        if (status === '0') setLastTextAnswer('')
    }


    useEffect(() => {
        request_name()
        request_count()
        if (status === '1') {
            request_last_answer()
        }
    }, [])

    useEffect(() => {
        request_name()
        request_count()
        if (status === '1') {
            request_last_answer()
        }
    }, [status, renderAnswers, renderAnswer])

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


    const [request_last_answer] = useRequest(async (access_token) => {
        await GetAnswer.get(access_token, setLastTextAnswer, id, setError)
    })

    const [toStatus, setToStatus] = useState(3 - status);

    const [request_hide_answer0] = useRequest(async (access_token) => {
        await PutStatus.get(access_token, id, 0, setToStatus, renderAnswers, setRenderAnswers, setError)
    })

    const [request_hide_answer1] = useRequest(async (access_token) => {
        await PutStatus.get(access_token, id, 1, setToStatus, renderAnswers, setRenderAnswers, setError)
    })

    const [request_hide_answer2] = useRequest(async (access_token) => {
        await PutStatus.get(access_token, id, 2, setToStatus, renderAnswers, setRenderAnswers, setError)
    })

    const hide_answer = () => {
        if (status === '1' || status === '0')
            request_hide_answer2()
        else if (status === '2') {

            if (countAnswers)
                request_hide_answer1()
            else
                request_hide_answer0()
        }
    }

    const [countAnswers, setCountAnswers] = useState(0);

    const [request_count] = useRequest(async (access_token) => {
        await CountAnswers.get(access_token, setCountAnswers, id, setError)
    })


    return (
        <>
            {status === '1' ?
                <div className={classes.answer_done}>
                    <div className={classes.without_btn_answer}>
                        <div className={classes.ans_and_quest}>
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
                        <div className={classes.hide_and_edit}>
                            <div>
                                <OverlayTrigger
                                    // key={placement}
                                    placement='left'
                                    overlay={
                                        <Tooltip>
                                            <FormattedMessage id='about_edit'/>
                                        </Tooltip>
                                    }
                                >
                                    <Button className={[classes.btn_edit, 'btn_white']} variant='info'
                                            onClick={handleShow}>
                                        ред
                                    </Button>
                                </OverlayTrigger>
                            </div>
                            <div>
                                <OverlayTrigger
                                    // key={placement}
                                    placement='left'
                                    overlay={
                                        <Tooltip>
                                            <FormattedMessage id='about_hide'/>
                                        </Tooltip>
                                    }
                                >
                                    <Button className={[classes.btn_hide, status === '2' ? '' : 'btn_white']}
                                            variant={status === '2' ? 'warning' : 'info'} onClick={hide_answer}>
                                        глаз
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={classes.answer}>
                    <div className={classes.without_btn_answer}>
                        <div className={classes.ans_and_quest}>
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
                            {status === '2' ?
                                <p className={classes.answer_text}>
                                    <FormattedMessage id='hide_teacher'/>

                                </p>
                                :
                                ''
                            }
                        </div>
                        <div className={classes.hide_and_edit}>
                            <div>
                                <OverlayTrigger
                                    // key={placement}
                                    placement='left'
                                    overlay={
                                        <Tooltip>
                                            <FormattedMessage id='about_hide'/>
                                        </Tooltip>
                                    }
                                >
                                    <Button className={[classes.btn_hide, status === '2' ? '' : 'btn_white']}
                                            variant={status === '2' ? 'warning' : 'info'} onClick={hide_answer}>
                                        глаз
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    {status === '2' ?
                        ''
                        :
                        <div className={classes.make_answer}>
                            <Button className={[classes.make_answer_btn, 'btn_white']} variant='info'
                                    onClick={handleShow}>
                                {status === '1' ?
                                    <FormattedMessage id='change_answer'/>
                                    :
                                    <FormattedMessage id='make_answer'/>
                                }
                            </Button>
                        </div>
                    }
                </div>
            }
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
                                maxlength='100'
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
                                {100 - textAnswer.length}
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
                        <Button className='btn_white' variant="info" type='submit'>
                            {status === '1' ?
                                <FormattedMessage id='save_changes'/>
                                :
                                <FormattedMessage id='make_answer'/>
                            }
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default OneQuestionsForAnswer