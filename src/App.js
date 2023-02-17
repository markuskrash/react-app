import './App.css';
import Loading from "./components/UI/Loading/Loading";
import React, {useEffect, useState} from "react";
import AuthContext from './context/index'
import Header from "./components/UI/Header/Header";
import {IntlProvider, useIntl} from 'react-intl';


function App() {
    // const intl = useIntl()
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

    return (
        // <IntlProvider messages={{}} locale='en' defaultLocale='en'>
            <AuthContext.Provider value={{
                isAuth,
                setIsAuth,
                isLoading,
                setIsLoading
            }}>
                <Header/>
                {isLoading
                    ? <Loading isLoading={isLoading}/>
                    : <></>}
                {isAuth
                    ? <h3>Вы вошли в аккаунт</h3>
                    : <></>
                }
            </AuthContext.Provider>
        // {/*</IntlProvider>*/}
    )
        ;
}

export default App;
