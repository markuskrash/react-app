import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import classes from './MySignUp.module.css'
import AuthContext from "../../../context";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import {Alert, FormText} from "react-bootstrap";
import SignUp from "../../../API/SignUp";


const MySignUp = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const {isAuth, setIsAuth, isLoading, setIsLoading} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [standing, setStanding] = useState('1');


    const [request] = useRequest(async () => {
        await SignUp.post(email, password, surname, first_name, second_name, standing, setIsAuth, setIsTryToSign, handleClose)
    })

    // useEffect(() => {
    //     console.log(isAuth)
    //     setValidated(true)
    // }, [isAuth, x])

    const login = (event) => {
        request()
    }

    const [isTryToSign, setIsTryToSign] = useState(false);


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
                        Sign up
                    </Button>
                    : <></>}
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
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                required
                                // value={password}
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setSurname(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                // value={password}
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setFirst_name(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Second name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setSecond_name(e.target.value)
                                }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Standing</Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.inputInfo}
                                         onChange={(e) => {
                                             setStanding(e.target.value)
                                         }}>
                                <option disabled={true}>Your standing in school</option>
                                <option value="1">Teacher</option>
                                <option value="2">Student</option>
                            </Form.Select>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Alert variant='danger' show={isTryToSign && isAuth === false}>
                            <div className={classes.alertText}>
                                {isTryToSign && isAuth === false
                                    ? 'Not all fields are entered correctly'
                                    : ''
                                }
                            </div>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" type='submit'>
                            Sign up
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default MySignUp;