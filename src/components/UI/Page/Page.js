import Loading from "../Loading/Loading";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context";
import Header from "../Header/Header";
import Ask from "../Ask/Ask";
import Questions from "../Questions/Questions";
import RefreshToken from "../../RefreshToken/RefreshToken";


const Page = () => {
    const {
        isAuth,
        setIsAuth,
        isLoading,
        setIsLoading,
        locale,
        setLocale,
        renderQuestions,
        setRenderQuestions
    } = useContext(AuthContext)


    return (
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
                    {/*{isAuth*/}
                    {/*    ? <h3>Вы вошли в аккаунт</h3>*/}
                    {/*    : <></>*/}
                    {/*}*/}
                    <Ask/>
                    <Questions/>
                </>
            }
        </>
    )
        ;
}

export default Page;
