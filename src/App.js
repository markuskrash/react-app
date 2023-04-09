import './App.css';
import Loading from "./components/UI/Loading/Loading";
import React, {useEffect, useState} from "react";
import AuthContext from './context/index'
import Header from "./components/UI/Header/Header";
import {IntlProvider, useIntl} from 'react-intl';
import {LOCALES} from "./languages/locales";
import {messages} from "./languages/messages";
import Ask from "./components/UI/Ask/Ask";
import OneQuestion from "./components/UI/OneQuestion/OneQuestion";
import Questions from "./components/UI/Questions/Questions";
import {useTimer} from 'use-timer';
import useRequest from "./hooks/useRequest";
import APIAsk from "./API/Ask";
import TimeToken from "./API/TimeToken";
import RefreshToken from "./components/RefreshToken/RefreshToken";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router/dist"
import VerifyEmail from "./components/UI/VerifyEmail/VerifyEmail";


const App = () => {
    // const intl = useIntl()
    // console.log(intl)
    const [isAuth, setIsAuth] = useState(false)

    const [renderQuestions, setRenderQuestions] = useState(0);


    useEffect(() => {
        // localStorage.clear()
        localStorage.setItem('error', '')
        if (localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) {
            setIsAuth(true)
            setRenderQuestions(renderQuestions + 1)
        } else {
            setIsAuth(false)
        }
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const [locale, setLocale] = useState(LOCALES.RUSSIAN)


    return (
        <BrowserRouter>
            <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
                <AuthContext.Provider value={{
                    isAuth,
                    setIsAuth,
                    isLoading,
                    setIsLoading,
                    locale,
                    setLocale,
                    renderQuestions,
                    setRenderQuestions,
                }}>
                    <Routes>
                        <Route exact path='/' element={
                            <>
                                {localStorage.getItem('error') !== "" ?
                                    <h>{localStorage.getItem('error')}</h>
                                    :
                                    <>
                                        <RefreshToken/>
                                        <Header/>
                                        {isLoading
                                            ? <Loading isLoading={isLoading}/>
                                            : <></>}
                                        <Ask/>
                                        <Questions/>
                                    </>
                                }
                            </>
                        }/>
                        <Route path='/:uuid' element={
                            <VerifyEmail/>
                        }/>
                    </Routes>
                </AuthContext.Provider>
            </IntlProvider>
        </BrowserRouter>
    )
        ;
}

export default App;
