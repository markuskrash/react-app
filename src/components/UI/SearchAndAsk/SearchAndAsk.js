import React, {useContext, useEffect, useState} from "react";
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import classes from './SearchAndAsk.module.css'
import Teachers from "../../../API/Teachers";
import APIAsk from "../../../API/Ask"
import Search from "../Search/Search";
import Ask from "../Ask/Ask";


const SearchAndAsk = () => {
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

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setQuestion("")
        setShow(false);
        setIsPublic(false)
    }
    const handleShow = () => {
        request_teachers()
        setShow(true);
    }

    const [question, setQuestion] = useState("");
    const [reciever, setReciever] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [isTryToAsk, setIsTryToAsk] = useState(false);

    const [teachers, setTeachers] = useState(
        [
            {
                'id': 1,
                'last_name': '1',
                'first_name': '2',
                'middle_name': '3',
            }
        ]
    );

    const [request_teachers] = useRequest(async (access_token) => {
        await Teachers.get(access_token, setTeachers, setReciever, setError)
    })


    const [request] = useRequest(async (access_token) => {
        await APIAsk.post(access_token, setIsTryToAsk, question, anonymous, reciever, handleClose, renderQuestions,
            setRenderQuestions, setAnonymous, isPublic, setIsPublic)
    })

    const ask = (event) => {
        request()
    }

    const sumbit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
        }
        ask(event)

    }

    useEffect(()=>{
        if(isPublic === false)
            setAnonymous(false)
    }, [isPublic])

    return (
        <>
            {isAuth?
                    <div className={classes.search_and_ask}>
                        <Search/>
                        <Ask/>
                    </div>
                : ""
            }
        </>

    )
}

export default SearchAndAsk