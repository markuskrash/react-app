import React, {useContext} from "react";
import classes from "./Language.module.css"
import {NavDropdown, Nav} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";


const LanguageSwap = () => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale} = useContext(AuthContext)



    return (
        <Nav.Item>
            <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
                variant="red"
                title={
                    locale === LOCALES.ENGLISH
                        ?
                        'Eng'
                        :
                        'Рус'
                }
                className={classes.dropdown}
                align={{lg: 'end'}}
            >
                <NavDropdown.Item as="button" onClick={()=>{setLocale(LOCALES.RUSSIAN)}} className={classes.dropdown_toggle}>
                    Рус
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as="button" onClick={()=>{setLocale(LOCALES.ENGLISH)}} className={classes.dropdown_toggle}>
                    Eng
                </NavDropdown.Item>
            </NavDropdown>
        </Nav.Item>
    )
}

export default LanguageSwap