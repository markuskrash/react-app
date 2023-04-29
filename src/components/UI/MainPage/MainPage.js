import React, {useContext, useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import classes from "./MainPage.module.css";
import Loading from "../Loading/Loading";
import Questions from "../Questions/Questions";
import Answers from "../Answers/Answers";
import Header from "../Header/Header";
import RefreshToken from "../../RefreshToken/RefreshToken";
import AuthContext from "../../../context";
import Ask from "../Ask/Ask";
import {FormattedMessage} from "react-intl";
import useRequest from "../../../hooks/useRequest";
import APIIsTeacher from "../../../API/APIIsTeacher";
import Search from "../Search/Search";
import SearchAndAsk from "../SearchAndAsk/SearchAndAsk";


const MainPage = () => {
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

    const [request_id] = useRequest(async (access_token) => {
        await APIIsTeacher.get(access_token, setIsTeacher, setError)
    })

    useEffect(() => {
        if (isAuth === true) {
            request_id()

        }
    }, [isAuth])

    return (
        <>
            <RefreshToken/>
            {error !== "" ?
                    <div className={classes.alert}>
                        <Alert variant='danger'><FormattedMessage id='alert'/></Alert>
                    </div>
                :
                <>
                    <Header/>
                    {isLoading ?
                        <Loading isLoading={isLoading}/>
                        : <></>}
                    <SearchAndAsk/>
                    {/*<Ask/>*/}
                    {/*<Search/>*/}
                    <Questions/>
                    <Answers/>
                </>
            }
         </>
)
;
};

export default MainPage;
