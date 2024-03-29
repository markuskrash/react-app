import Button from "react-bootstrap/Button";
import React, {useContext} from "react";
import AuthContext from "../../../context";
import classes from './Header.module.css'
import MyLogIn from "../MyLogin/MyLogIn";
import MySignUp from "../MySignUp/MySignUp";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import LanguageSwap from "../LanguageSwap/LanguageSwap";
import {FormattedMessage} from "react-intl";

const Header = () => {
    return (
        <>
            <Navbar variant="dark" expand="lg" bg="primary">
                <Container fluid>
                    <Navbar.Brand><h2 ><FormattedMessage id='logo'/></h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-primary-example"/>
                    <Navbar.Collapse id="navbar-primary-example" className="justify-content-end">
                        <Nav className={classes.nav}>
                            <MySignUp/>
                            <MyLogIn/>
                            <LanguageSwap/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
    )
}

export default Header