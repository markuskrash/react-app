import React, {useContext} from "react";
import classes from "./Language.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";


const Question = () => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale} = useContext(AuthContext)



    return (

    )
}

export default Question