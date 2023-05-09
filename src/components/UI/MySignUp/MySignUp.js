import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import classes from './MySignUp.module.scss'
import AuthContext from "../../../context";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import {Alert, FormText, Nav} from "react-bootstrap";
import SignUp from "../../../API/SignUp";
import {FormattedMessage} from "react-intl";
import {messages} from "../../../languages/messages";


const MySignUp = () => {
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
    const [surname, setSurname] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [second_name, setSecond_name] = useState('');
    const [position, setPosition] = useState('1');


    const [request] = useRequest(async () => {
        await SignUp.post(email, password, surname, first_name, second_name, position, setIsAuth, setIsTryToSign, handleClose, setPosition)
    })

    // useEffect(() => {
    //     console.log(isAuth)
    //     setValidated(true)
    // }, [isAuth, x])

    const signup = (event) => {
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
        signup(event)

    }


    return (
        <>
            <div className={classes.myButton}>
                {isAuth === false
                    ?
                        <Nav.Item>
                            <Nav.Link variant="dark" onClick={handleShow}>
                                <FormattedMessage id='signup'/>
                            </Nav.Link>
                        </Nav.Item>
                    : <></>}
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form noValidate onSubmit={sumbit}>
                    <Modal.Header closeButton>
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
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='surname'/></Form.Label>
                            <Form.Control
                                required
                                // value={password}
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setSurname(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='first_name'/></Form.Label>
                            <Form.Control
                                required
                                // value={password}
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setFirst_name(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='second_name'/></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setSecond_name(e.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='position'/></Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.inputInfo}
                                         onChange={(e) => {
                                             setPosition(e.target.value)
                                         }}>
                                <option disabled={true}><FormattedMessage id='position_info'/></option>
                                <option value="1"><FormattedMessage id='teacher'/></option>
                                <option value="0"><FormattedMessage id='student'/></option>
                            </Form.Select>
                        </Form.Group>
                        <Alert variant='danger' show={isTryToSign && isAuth === false}>
                            <div className={classes.alertText}>
                                {isTryToSign && isAuth === false
                                    ? <FormattedMessage id='signup_alert' />
                                    : ''
                                }
                            </div>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='btn_white' variant="info" type='submit'>
                            <FormattedMessage id='signup'/>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default MySignUp;