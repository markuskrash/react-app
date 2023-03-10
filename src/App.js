import './App.css';
import Loading from "./components/UI/Loading/Loading";
import React, {useEffect, useState} from "react";
import AuthContext from './context/index'
import Header from "./components/UI/Header/Header";
import {IntlProvider, useIntl} from 'react-intl';
import {LOCALES} from "./languages/locales";
import {messages} from "./languages/messages";
import Ask from "./components/UI/Ask/Ask";
import Question from "./components/UI/Question/Question";


function App() {
    // const intl = useIntl()
    // console.log(intl)
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        localStorage.clear()
        localStorage.setItem('error', '')
        if (localStorage.getItem('accessToken') !== "" && localStorage.getItem('accessToken') !== null) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [])

    const [isLoading, setIsLoading] = useState(false);

    const [locale, setLocale] = useState(LOCALES.RUSSIAN)

    return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={LOCALES.ENGLISH}>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading,
                setIsLoading,
                locale,
                setLocale,
                // intl
            }}>
                <Header/>
                {isLoading
                    ? <Loading isLoading={isLoading}/>
                    : <></>}
                {/*{isAuth*/}
                {/*    ? <h3>Вы вошли в аккаунт</h3>*/}
                {/*    : <></>*/}
                {/*}*/}
                <Ask/>
                <Question/>
            </AuthContext.Provider>
         </IntlProvider>
    )
        ;
}

export default App;
