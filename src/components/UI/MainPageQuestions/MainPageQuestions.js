import React, {lazy, useContext, useEffect, useState, Suspense, useRef} from "react";
import classes from "./MainPageQuestions.module.scss"
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
import GetMainPageQuestions from "../../../API/GetMainPageQuestions";
import GetMainPageQuestionsFilter from "../../../API/GetMainPageQuestionsFilter";
import OneMainPageQuestion from "../OneMainPageQuestion/OneMainPageQuestion";


const MainPageQuestions = () => {
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
        await GetMainPageQuestions.get(access_token, setQuestions, currentPage, setTotalCount, setError)
    })

    const [request_questions_filter] = useRequest(async (access_token) => {
        await GetMainPageQuestionsFilter.get(access_token, setQuestionsFilter, renderQuestion, setRenderQuestion, filter, currentPage, null, setTotalCount, setError)
    })

    const [request_questions_filter2] = useRequest(async (access_token) => {
        await GetMainPageQuestionsFilter.get(access_token, setQuestionsFilter, renderQuestion, setRenderQuestion, filter, currentPage, setCurrentPage, setTotalCount, setError)
    })


    useEffect(() => {
        request_questions()

    }, [renderQuestions, isAuth, isTeacher])

    useEffect(() => {
        request_questions_filter();
    }, [questions])

    useEffect(() => {
        request_questions_filter2();
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
        request_questions_filter()

    }, [currentPage])

    useEffect(() => {
        setRenderQuestion(renderQuestion + 1)
    }, [questionsFilter])

    return (
        <div>
            {questions.length > 0 ?
                questionsFilter.map(question => (
                    <OneMainPageQuestion text={question['text']} status={question['status']}
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
                    <Alert variant='primary'><FormattedMessage id='all_info'/></Alert>
                </div>
            }
            {paginationRange.length > 1 ?
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

export default MainPageQuestions