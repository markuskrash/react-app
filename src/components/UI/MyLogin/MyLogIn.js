import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import classes from './MyLogIn.module.css'
import AuthContext from "../../../context";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import {Alert, FormText} from "react-bootstrap";


const MyLogIn = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const {isAuth, setIsAuth, isLoading, setIsLoading} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [request] = useRequest(async () => {
        await LogIn.post(email, password, setIsAuth, setIsTryToAuth, handleClose)
    })

    // useEffect(() => {
    //     console.log(isAuth)
    //     setValidated(true)
    // }, [isAuth, x])

    const login = (event) => {
        request()
    }

    const logout = (event) => {
        localStorage.setItem('accessToken', "")
        localStorage.setItem('refreshToken', "")
        localStorage.setItem('email', "")
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


    return (
        <>
            <div className={classes.myButton}>
                {isAuth === false
                    ?

                    <Button variant="light" onClick={handleShow}>
                        Log in
                    </Button>
                    : <button className={classes.accauntName} onClick={logout}>
                        {email}
                    </button>}
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form noValidate onSubmit={sumbit}>
                    <Modal.Header closeButton>
                        {/*<Modal.Title>Log in</Modal.Title>*/}
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                value={email}
                                required
                                type="email"
                                autoFocus
                                className={classes.inputInfo}
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                value={password}
                                type="password"
                                className={classes.inputInfo}
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Alert variant='danger' show={isTryToAuth && isAuth === false}>
                            <div className={classes.alertText}>
                                {isTryToAuth && isAuth === false
                                    ? 'Email or password is wrong'
                                    : ''
                                }
                            </div>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" type='submit'>
                            Log in
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default MyLogIn;