import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Loading.module.css'

const Loading = ({isLoading}) => {
    return (
        <>
            {isLoading
                ?   < div className={classes.window}>
                        < Spinner className={classes.spinner} animation="border" variant="dark"/>
                    < /div>
                : <></>
            }
        </>
    );
};

export default Loading;