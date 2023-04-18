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
    return (
        <>
            <RefreshToken/>
            {error !== "" ?
                <>
                    <div className={classes.alert}>
                        <Alert variant='danger'>{error.response.data['detail']}</Alert>
                    </div>
                </>
                :
                <>
                    <Header/>
                    {isLoading ?
                        <Loading isLoading={isLoading}/>
                        : <></>}
                    <Ask/>
                    <Questions/>
                    <Answers/>
                </>
            }
         </>
)
;
};

export default MainPage;
