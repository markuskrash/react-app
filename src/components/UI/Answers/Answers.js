import React, {useContext, useEffect, useState} from "react";
import classes from "./Answers.module.scss"
import {NavDropdown, Nav, Alert} from "react-bootstrap";
import AuthContext from "../../../context";
import {messages} from "../../../languages/messages";
import {LOCALES} from "../../../languages/locales";
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import OneQuestion from "../OneQuestion/OneQuestion";
import useRequest from "../../../hooks/useRequest";
import GetQuestions from "../../../API/GetQuestions";
import GetQuestionsForAnswer from "../../../API/GetQuestionsForAnswer";
import OneQuestionsForAnswer from "../OneQuestionsForAnswer/OneQuestionsForAnswer";
import GetQuestionsFilter from "../../../API/GetQuestionsFilter";
import GetQuestionsForAnswerFilter from "../../../API/GetQuestionsForAnswerFilter";
import {DOTS, usePagination} from "../../../hooks/usePagination";


const Answers = () => {
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

    const [request_questions] = useRequest(async (access_token) => {
        await GetQuestionsForAnswer.get(access_token, setQuestions, currentPage, setTotalCount, setError)
    })

    const [request_questions_filter] = useRequest(async (access_token) => {
        await GetQuestionsForAnswerFilter.get(access_token, setQuestionsFilter, filter, currentPage,null, setTotalCount, setError)
    })

     const [request_questions_filter2] = useRequest(async (access_token) => {
        await GetQuestionsForAnswerFilter.get(access_token, setQuestionsFilter, filter, currentPage,setCurrentPage, setTotalCount, setError)
    })

    const [renderAnswer, setRenderAnswer] = useState(0);

    useEffect(() => {
        if (isAuth && isTeacher) {
            request_questions()
        }else if(!isAuth){
            setCurrentPage(1)
            setFilter('')
        }
    }, [isAuth , renderAnswers, isTeacher])

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
            setRenderAnswer(renderAnswer + 1)
        }
    }, [questionsFilter])


    return (
        <div>
            {isAuth === true && isTeacher === true ?
                questions.length > 0 ?
                    questionsFilter.map(question => (
                        <OneQuestionsForAnswer text={question['text']} status={question['status']}
                                               owner={question['owner']}
                                               id={question['id']} is_anonymous={question['anonymous']}
                                               is_public={question['public']}
                                               renderAnswer={renderAnswer}
                        />
                    ))
                    :
                    <div className={classes.answers}>
                        <Alert variant='primary'><FormattedMessage id='answers_info'/></Alert>
                    </div>
                : ""

            }
            {isAuth === true && isTeacher === true && paginationRange.length > 1 ?
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

export default Answers