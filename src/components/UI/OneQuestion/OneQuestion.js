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
import GetPersonId from "../../../API/GetNameWithoutId";
import GetName from "../../../API/GetName";
import CountAnswers from "../../../API/CountAnswers";


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


    useEffect(() => {
        if (status === "1") {
            request_answers();
            request_name()
            request_count()
        }
    }, [])

    const [answer, setAnswer] = useState("");

    const [request_answers] = useRequest(async (access_token) => {
        await GetAnswers.get(access_token, setAnswer, id, setError)
    })

    const [personName, setPersonName] = useState('');

    const [request_name] = useRequest(async (access_token) => {
        await GetName.get(access_token, setPersonName, reciever, setError)
    })

    const [countAnswers, setCountAnswers] = useState(0);

    const [request_count] = useRequest(async (access_token) => {
        await CountAnswers.get(access_token, setCountAnswers, id, setError)
    })

    return (
        <div>
            <div className={classes.question}>
                <p className={classes.question_text}>
                    <FormattedMessage id='your_question'/>
                    {text}
                </p>
                <div className={classes.answer_text}>
                    {status === "0" ?
                        <FormattedMessage id='wait_answer'/>
                        :
                        <>
                            {personName} <FormattedMessage id='teacher_answer'/>
                            {countAnswers > 1 ?
                                    <h>(<FormattedMessage id='is_edited'/>)</h>
                                :
                                ''}
                            :{' '}
                            {/*<br/>*/}
                            {answer}
                        </>
                    }
                </div>
            </div>
            {/*<Modal show={show} onHide={handleClose} animation={false}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        {status === "0" ?*/}
            {/*            <FormattedMessage id='wait_answer'/>*/}
            {/*            :*/}
            {/*            <>*/}
            {/*                <FormattedMessage id='teacher_answer'/> {personEmail}:*/}

            {/*                <br/>*/}
            {/*                {answer}*/}
            {/*            </>*/}
            {/*        }*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="dark" type='submit' onClick={handleClose}>*/}
            {/*            <FormattedMessage id='close'/>*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </div>
    )
}

export default OneQuestion