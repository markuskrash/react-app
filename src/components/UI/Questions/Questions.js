import React, {lazy, useContext, useEffect, useState, Suspense, useRef} from "react";
import classes from "./Questions.module.scss"
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
// import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";
import GetQuestionsFilter from "../../../API/GetQuestionsFilter";
import LazyOneQuestion from "../LazyOneQuestion/LazyOneQuestion";
import LazyLoading from "../LazyLoading/LazyLoading";
import OneQuestion from "../OneQuestion/OneQuestion";
import {DOTS, usePagination} from "../../../hooks/usePagination";


const Questions = () => {
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
        setError,
        filter,
        setFilter,
    } = useContext(AuthContext)

    const [questions, setQuestions] = useState([]);
    const [questionsFilter, setQuestionsFilter] = useState([]);
    const [renderQuestion, setRenderQuestion] = useState(0);

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestions.get(access_token, setQuestions, currentPage, setTotalCount, setError)
    })

    const [request_questions_filter] = useRequest(async (access_token) => {
        await GetQuestionsFilter.get(access_token, setQuestionsFilter, renderQuestion, setRenderQuestion, filter, currentPage, null, setTotalCount, setError)
    })

    const [request_questions_filter2] = useRequest(async (access_token) => {
        await GetQuestionsFilter.get(access_token, setQuestionsFilter, renderQuestion, setRenderQuestion, filter, currentPage, setCurrentPage, setTotalCount, setError)
    })


    useEffect(() => {
        if (isAuth && isTeacher === false) {
            request_questions()
        } else if (!isAuth) {
            setCurrentPage(1)
            setFilter('')
        }
    }, [renderQuestions, isAuth, isTeacher])

    useEffect(() => {
        if (isAuth) {
            request_questions_filter();
        }
    }, [questions])

    useEffect(() => {
        if (isAuth) {
            request_questions_filter2();
        }
    }, [filter])


    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [totalCount, setTotalCount] = useState(0);

    const paginationRange = usePagination({
        totalCount,
        pageSize,
        currentPage,
    });

    const onNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const onPrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    useEffect(() => {
        if (isAuth) {
            request_questions_filter()

        }
    }, [currentPage])

    useEffect(() => {
        if (isAuth) {
            setRenderQuestion(renderQuestion + 1)
        }
    }, [questionsFilter])

    return (
        <div className={classes.questions}>
            {isAuth === true && isTeacher === false ?
                questions.length > 0 ?
                    questionsFilter.map(question => (
                        <OneQuestion text={question['text']} status={question['status']}
                                     reciever={question['reciever']}
                                     id={question['id']} owner={question['owner']}
                                     is_anonymous={question['anonymous']}
                                     is_public={question['public']}
                                     renderQuestion={renderQuestion}
                                     currentPage={currentPage} setCurrentPage={setCurrentPage}
                                     totalCount={questionsFilter.length / 10}
                        />
                    ))

                    :
                    <div className={classes.questions}>
                        <Alert variant='primary'><FormattedMessage id='questions_info'/></Alert>
                    </div>
                : ""
            }
            {isAuth === true && isTeacher === false && paginationRange.length > 1 ?
                < div className={classes.pagination_container}>
                    <Button
                        className={[
                            classes.pagination_item,
                            {disabled: currentPage === 1}
                        ]}
                        onClick={onPrevious}

                    >
                        {' <'}
                    </Button>
                    {paginationRange.map(pageNumber => {
                        if (pageNumber === DOTS) {
                            return <Button
                                className={[classes.pagination_item, classes.dots]}
                                disabled
                                variant='outline-primary'
                            >
                                &#8230;
                            </Button>;
                        }

                        if (pageNumber === currentPage) {
                            return <Button className={classes.pagination_item}
                                           onClick={() => setCurrentPage(pageNumber)}

                            >
                                {pageNumber}
                            </Button>;
                        }

                        return (
                            <Button
                                className={classes.pagination_item}
                                onClick={() => setCurrentPage(pageNumber)}
                                variant='outline-primary'
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}
                    <Button
                        className={[
                            classes.pagination_item,
                            {disabled: currentPage === lastPage}
                        ]}
                        onClick={onNext}
                    >
                        >
                    </Button>
                </div>
                : ''
            }
        </div>

    )
}

export default Questions