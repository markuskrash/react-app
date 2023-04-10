import React, {useContext, useEffect, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import AuthContext from "../../context";
import useRequest from "../../hooks/useRequest";

import APIAsk from "../../API/Ask";
import {useTimer} from "use-timer";
import TimeToken from "../../API/TimeToken";
import APIIsTeacher from "../../API/APIIsTeacher";


const RefreshToken = () => {
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
    } = useContext(AuthContext)

    const {time, start, pause, reset, status} = useTimer({
        endTime: 250,
        onTimeOver: () => {
            request_refresh();
            reset();
            start();
        },
    });

    useEffect(() => {
        if(isAuth){
            start();
        }else{
            pause();
            reset();
        }
    }, [isAuth])

    const [request_refresh] = useRequest(async (access_token) => {
        await TimeToken.post(access_token)
    })

    const [request_id] = useRequest(async (access_token) => {
        await APIIsTeacher.get(access_token, setIsTeacher)
    })

    useEffect(() => {
        if (isAuth === true) {
            request_id()

        }
    }, [isAuth])


    // return(
        // <h>{time}</h>
    // );

};

export default RefreshToken;