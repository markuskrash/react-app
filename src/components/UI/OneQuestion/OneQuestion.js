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
import GetAnswer from "../../../API/GetAnswer";
import GetPersonId from "../../../API/GetNameWithoutId";
import GetName from "../../../API/GetName";
import CountAnswers from "../../../API/CountAnswers";
import GetId from "../../../API/GetId";
import {usePagination} from "../../../hooks/usePagination";


const OneQuestion = ({
                         text,
                         status,
                         reciever,
                         id,
                         is_anonymous,
                         is_public,
                         owner,
                         renderQuestion,
                         currentPage,
                         setCurrentPage,
                         siblingCount = 1,
                         totalCount,
                     }) => {
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
            request_count()
            request_id()
            request_reciever()

        }
    }, [])


    useEffect(() => {
        if (status === "1") {
            request_answers();
            request_count()
            request_id()
            request_reciever()

        }
    }, [renderQuestion])


    const [answer, setAnswer] = useState("");

    const [request_answers] = useRequest(async (access_token) => {
        await GetAnswer.get(access_token, setAnswer, id, setError)
    })

    const [recieverName, setRecieverName] = useState('');

    const [request_reciever] = useRequest(async (access_token) => {
        await GetName.get(access_token, setRecieverName, reciever, setError)
    })

    const [ownerName, setOwnerName] = useState('');

    const [request_owner] = useRequest(async (access_token) => {
        await GetName.get(access_token, setOwnerName, owner, setError)
    })

    const [countAnswers, setCountAnswers] = useState(0);

    const [request_count] = useRequest(async (access_token) => {
        await CountAnswers.get(access_token, setCountAnswers, id, setError)
    })

    const [personId, setPersonId] = useState('');

    const [request_id] = useRequest(async (access_token) => {
        await GetId.get(access_token, setPersonId, setError)
    })

    useEffect(() => {
        if (isAuth)
            request_id()

    }, [renderQuestions])

    useEffect(() => {
        if (isAuth)
            request_owner()
    }, [isAuth, renderQuestion])

    return (
        status === '1' ?
            <div className={classes.question_with_answer}>
                {is_public ?
                    personId === owner ?
                        is_anonymous ?
                            <p className={classes.question_text}>
                                <FormattedMessage id='your_question_public_anonymous'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                            :
                            <p className={classes.question_text}>
                                <FormattedMessage id='your_question_public'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                        :
                        is_anonymous ?
                            <p className={classes.question_text}>
                                <FormattedMessage id='another_student_question_public_anonymous'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                            :
                            <p className={classes.question_text}>
                                {ownerName} <FormattedMessage id='student_question_public'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                    :
                    <p className={classes.question_text}>
                        <FormattedMessage id='your_question'/>:{' '}
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{text}
                    </p>
                }
                <p className={classes.answer_text}>
                    {status === "0" ?
                        <FormattedMessage id='wait_answer'/>
                        :
                        <>
                            {recieverName} <FormattedMessage id='teacher_answer'/>
                            {countAnswers > 1 ?
                                <h> (<FormattedMessage id='is_edited'/>)</h>
                                :
                                ''}
                            :{' '}
                            {/*<br/>*/}
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;{answer}
                        </>
                    }
                </p>
            </div>
            :
            <div className={classes.question}>
                {is_public ?
                    personId === owner ?
                        is_anonymous ?
                            <p className={classes.question_text}>
                                <FormattedMessage id='your_question_public_anonymous'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                            :
                            <p className={classes.question_text}>
                                <FormattedMessage id='your_question_public'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                        :
                        is_anonymous ?
                            <p className={classes.question_text}>
                                <FormattedMessage id='another_student_question_public_anonymous'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                            :
                            <p className={classes.question_text}>
                                {ownerName} <FormattedMessage id='student_question_public'/>:{' '}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{text}
                            </p>
                    :
                    <p className={classes.question_text}>
                        <FormattedMessage id='your_question'/>:{' '}
                        <br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{text}
                    </p>
                }
                <div className={classes.answer_text}>
                    {status === "0" ?
                        <FormattedMessage id='wait_answer'/>
                        :
                        status === '2' ?
                            <>
                                {recieverName} <FormattedMessage id='hide_student'/>
                            </>

                            :
                            <>
                                {recieverName} <FormattedMessage id='teacher_answer'/>
                                {countAnswers > 1 ?
                                    <h> (<FormattedMessage id='is_edited'/>)</h>
                                    :
                                    ''}
                                :{' '}
                                {/*<br/>*/}
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;{answer}
                            </>
                    }
                </div>
            </div>

    )
}

export default OneQuestion