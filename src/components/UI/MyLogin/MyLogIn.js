import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from "../Loading/Loading";
// import axios from "axios";
import classes from './MyLogin.module.css'
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


    const [x, setX] = useState(0);
    const [request] = useRequest(async () => {
        await LogIn.post(email, password, setIsAuth, setIsTryToAuth, handleClose)
    })

    useEffect(() => {
        setValidated(isAuth)
    }, [isAuth, x])

    const login = (event) => {
        request()
        setX(x + 1)
    }

    const [validated, setValidated] = useState(false);
    const [isTryToAuth, setIsTryToAuth] = useState(false);


    const sumbit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            setValidated(false)
            event.stopPropagation()
        } else {
            event.preventDefault()
        }
        login(event)

    }


    return (
        <>
            {(isAuth === false && isTryToAuth !== false) || (isTryToAuth === false)
                ?
                <Button variant="primary" onClick={handleShow}>
                    Sign in
                </Button>
                : <></>
            }
            <div className={classes.s}>
                <Modal dialogClassName={classes.s} show={show} onHide={handleClose} animation={false}>
                    <Form noValidate validated={validated} onSubmit={sumbit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    autoFocus
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
                                    type="password"
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
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </>
    )
        ;
};

export default MyLogIn;