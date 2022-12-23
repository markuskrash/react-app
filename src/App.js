import './App.css';
import MyLogIn from "./components/UI/MyLogin/MyLogIn";
import Loading from "./components/UI/Loading/Loading";
import React, {useEffect, useState} from "react";
import AuthContext from './context/index'


function App() {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        // localStorage.setItem('error', '')
        localStorage.clear()
        if (localStorage.getItem('accessToken')) {
            setIsAuth(true)
        } else {
            setIsAuth((false))
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
            {isLoading
                ? <Loading isLoading={isLoading}/>
                : <></>}
                    {isAuth
                        ? <h1>Вы вошли в аккаунт</h1>
                        : <></>
                    }
                    <MyLogIn/>
            {/*    </>*/}
            {/*}*/}
        </AuthContext.Provider>
    )
        ;
}

export default App;
