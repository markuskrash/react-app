import Button from "react-bootstrap/Button";
import React, {useContext} from "react";
import AuthContext from "../../../context";
import classes from './Header.module.css'
import MyLogIn from "../MyLogin/MyLogIn";
import MySignUp from "../MySignUp/MySignUp";
import AccDropdown from "../AccDropdown/AccDropdown";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import LanguageSwap from "../LanguageSwap/LanguageSwap";

const Header = () => {
    return (
        <>
            <Navbar variant="dark" expand="lg" bg="dark">
                <Container fluid>
                    <Navbar.Brand>Ask lyceum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example"/>
                    <Navbar.Collapse id="navbar-dark-example" className="justify-content-end">
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