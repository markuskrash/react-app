import React, {useContext, useEffect, useState} from "react";
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
import Teachers from "../../../API/Teachers";


const Ask = () => {
    const {isAuth, setIsAuth, isLoading, setIsLoading, locale, setLocale} = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [question, setQuestion] = useState("");
    const [reciever, setReciever] = useState();
    const [isTryToAsk, setIsTryToAsk] = useState(false);

    const [teachers, setTeachers] = useState(
        [
            {
                'id': 1,
                'last_name': '1',
                'first_name': '2',
                'middle_name': '3',
            }
        ]
    );

    const [request_teachers] = useRequest(async () => {
        await Teachers.get(setTeachers, setReciever, setIsTryToAsk)
    })

    useEffect(() => {
        request_teachers()
    }, [])
    useEffect(() => {
        console.log(reciever)
    }, [reciever])
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
                                maxlength='50'

                                className={classes.inputInfo}
                                onChange={(e) => {
                                    setQuestion(e.target.value)
                                }}
                            />
                            <Form.Label>
                                <FormattedMessage id='max_length'/>
                                {": "}
                                {50 - question.length}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label><FormattedMessage id='reciever'/></Form.Label>
                            <Form.Select aria-label="Default select example" className={classes.inputInfo}
                                         onChange={(e) => {
                                             setReciever(e.target.value)
                                         }}>
                                <option disabled={true}><FormattedMessage id='reciever_info'/></option>
                                {teachers.map(teachers => (
                                    <option value={teachers["id"]}>
                                        {teachers["last_name"]} {teachers["first_name"]} {teachers["middle_name"]}
                                    </option>
                                ))}
                                {/*<option value="1"><FormattedMessage id='teacher'/></option>*/}
                                {/*<option value="2"><FormattedMessage id='student'/></option>*/}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className={classes.formSwitch}>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={<FormattedMessage id='public'/>}
                                className={classes.form_switch}
                            >

                            </Form.Check>
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