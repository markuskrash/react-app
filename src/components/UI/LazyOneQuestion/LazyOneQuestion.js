import React, {lazy, useContext, useEffect, useState, Suspense, useRef} from "react";
import classes from "./LazyOneQuestion.module.scss"
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
// import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";
import GetQuestionsFilter from "../../../API/GetQuestionsFilter";
import useOnScreen from "../../../hooks/usePagination";
import LazyLoading from "../LazyLoading/LazyLoading";

const OneQuestion = lazy(() => import('../OneQuestion/OneQuestion'))


const LazyOneQuestion = ({
                             text,
                             status,
                             reciever,
                             id,
                             is_anonymous,
                             is_public,
                             owner,
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
        setError,
        filter,
        setFilter,

    } = useContext(AuthContext)


    return (
        <div className={classes.question}>
            <div>
                <OneQuestion text={text} status={status}
                             reciever={reciever}
                             id={id} owner={owner}
                             is_anonymous={is_anonymous}
                             is_public={is_public}
                    // onLoad={()=>{setShow=true}
                />
            </div>
        </div>
    )
}

export default LazyOneQuestion