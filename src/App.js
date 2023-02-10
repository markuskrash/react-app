import './App.css';
import Loading from "./components/UI/Loading/Loading";
import React, {useEffect, useState} from "react";
import AuthContext from './context/index'
import Header from "./components/UI/Header/Header";


function App() {
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
    )
        ;
}

export default App;
