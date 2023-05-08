import React, {useContext} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './LazyLoading.module.css'
import AuthContext from "../../../context";

const LazyLoading = ({question}) => {
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
        isLazyLoading,
        setIsLazyLoading,
        lazyQuestion,
        setLazyQuestion,
    } = useContext(AuthContext)

    return (
        <>
            {isLazyLoading && question === lazyQuestion
                ? <div className={classes.wrapper}>
                    < div className={classes.window}>
                        < Spinner className={classes.spinner} animation="border" variant="dark"/>
                    < /div>
                </div>
                : <></>
            }
        </>
    );
};

export default LazyLoading;