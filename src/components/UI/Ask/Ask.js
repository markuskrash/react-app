import React, {useContext, useState} from "react";
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import useRequest from "../../../hooks/useRequest";
import LogIn from "../../../API/LogIn";
import classes from './Ask.module.css'


const Ask = () => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale} = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [question, setQuestion] = useState();
    const [reciever, setReciever] = useState();
    const [isTryToAsk, setIsTryToAsk] = useState(false);

    // const [request] = useRequest(async () => {
    //     await LogIn.post(email, password, setIsAuth, setIsTryToAuth, handleClose)
    // })

    const ask = (event) => {
        // request()
    }

    const sumbit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
        }
        ask(event)

    }

    return (
        <>
            <div className={classes.ask}>
                <Button className={classes.ask_btn} variant='dark' onClick={handleShow}>
                    <FormattedMessage id='ask'/>
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form noValidate onSubmit={sumbit}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label><FormattedMessage id='question'/></Form.Label>
                            <Form.Control
                                required
                                autoFocus
                                as='textarea'
                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setQuestion(e.target.value)
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
                                             setReciever(e.target.value)
                                         }}>
                                <option disabled={true}><FormattedMessage id='position_info'/></option>
                                <option value="1"><FormattedMessage id='teacher'/></option>
                                <option value="2"><FormattedMessage id='student'/></option>
                            </Form.Select>
                        </Form.Group>
                        <Alert variant='danger' show={isTryToAsk}>
                            <div className={classes.alertText}>
                                {isTryToAsk
                                    ? <FormattedMessage id='alert'/>
                                    : ''
                                }
                            </div>
                        </Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" type='submit'>
                            <FormattedMessage id='ask'/>
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Ask