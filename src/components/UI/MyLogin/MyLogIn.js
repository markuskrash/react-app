import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import classes from './MyLogIn.module.scss'
import AuthContext from "../../../context";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import {Alert, Dropdown, DropdownButton, FormText, Nav, NavDropdown} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {FormattedMessage} from "react-intl";
import {messages} from "../../../languages/messages";
import Teachers from "../../../API/Teachers";
import GetNameWithoutId from "../../../API/GetNameWithoutId";
import DropdownItem from "react-bootstrap/DropdownItem";


const MyLogIn = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [request] = useRequest(async () => {
        await LogIn.post(email, password, setIsAuth, setIsTryToAuth, handleClose)
    })


    const login = (event) => {
        request()
    }

    const logout = (event) => {
        localStorage.setItem('accessToken', "")
        localStorage.setItem('refreshToken', "")
        setIsAuth(false)
        setIsTryToAuth(false)
    }

    const [isTryToAuth, setIsTryToAuth] = useState(false);


    const sumbit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
        }
        login(event)

    }

    const [personEmail, setPersonEmail] = useState('');
    const [persons, setPersons] = useState('');

    const [request_email] = useRequest(async (access_token) => {
        await GetNameWithoutId.get(access_token, setPersonEmail, setError)
    })


    useEffect(() => {
        if (isAuth) {
            request_email()
        }
    }, [isAuth])


    return (
        <>
            <div className={classes.myButton}>
                {isAuth === false
                    ?

                    <Nav.Item>
                        <Nav.Link variant="dark" onClick={handleShow}>
                            <FormattedMessage id='login'/>
                        </Nav.Link>
                    </Nav.Item>

                    :
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={personEmail}
                        align={{lg: 'end'}}
                        className={classes.dropdown}
                    >
                            <Dropdown.Item as="button" onClick={logout} className={classes.dropdown_toggle_out}>
                                <FormattedMessage id='logout'/>
                            </Dropdown.Item>
                    </NavDropdown>
                }
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form noValidate onSubmit={sumbit}>
                    <Modal.Header closeButton>
                        {/*<Modal.Title>Log in</Modal.Title>*/}
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label><FormattedMessage id='email_address'/></Form.Label>
                            <Form.Control
                                value={email}
                                required
                                type="email"
                                autoFocus
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='password'/></Form.Label>
                            <Form.Control
                                required
                                value={password}
                                type="password"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Alert variant='danger' show={isTryToAuth && isAuth === false}>
                            <div className={classes.alertText}>
                                {isTryToAuth && isAuth === false
                                    ? <FormattedMessage id='login_alert'/>
                                    : ''
                                }
                            </div>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" type='submit'>
                            <FormattedMessage id='login'/>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default MyLogIn;