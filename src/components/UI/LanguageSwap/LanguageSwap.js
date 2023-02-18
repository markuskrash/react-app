import React, {useContext} from "react";
import classes from "./Language.module.css"
import {NavDropdown, Nav} from "react-bootstrap";


const LanguageSwap = () => {
    return (
        <Nav.Item>
            <NavDropdown
                id="nav-dropdown-dark-example"
                menuVariant="dark"
                variant="red"
                title="123"
                className={classes.dropdown}
                align={{lg: 'end'}}
            >
                <NavDropdown.Item as="button" className={classes.dropdown_toggle}>
                    рус
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as="button" onClick className={classes.dropdown_toggle}>
                    eng
                </NavDropdown.Item>
            </NavDropdown>
        </Nav.Item>
    )
}

export default LanguageSwap