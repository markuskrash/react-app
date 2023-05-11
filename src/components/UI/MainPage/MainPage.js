import React, {useContext, useEffect, useState} from "react";
import {Alert, Card} from "react-bootstrap";
import classes from "./MainPage.module.scss";
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
import sclasses from "../../../custom.scss"
import MainPageQuestions from "../MainPageQuestions/MainPageQuestions";

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
                    <div className={classes.about_and_search}>
                        <div className={classes.about_and_search_item}>
                            <SearchAndAsk/>
                            {/*<Ask/>*/}
                            {/*<Search/>*/}
                            <Questions/>
                            <Answers/>


                            {isAuth ?
                                <></>
                                :
                                <MainPageQuestions/>
                                // <div className={classes.info}>
                                //     <Card className={classes.info_card} bg='secondary'>
                                //         <Card.Body as='Alert'>
                                //             <Card.Title>
                                //                 <FormattedMessage id='main_page_title_info'/>
                                //             </Card.Title>
                                //             <FormattedMessage id='main_page_info'/>
                                //         </Card.Body>
                                //     </Card>
                                // </div>
                                // <div className={classes.info}>
                                //     <Alert variant='primary'><FormattedMessage id='main_page_info'/></Alert>
                                // </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
        ;
};

export default MainPage;
