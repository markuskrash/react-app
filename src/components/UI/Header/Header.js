import Button from "react-bootstrap/Button";
import React, {useContext} from "react";
import AuthContext from "../../../context";
import classes from './Header.module.css'
import MyLogIn from "../MyLogin/MyLogIn";
import MySignUp from "../MySignUp/MySignUp";

const Header = () => {
    return(
         <div className={classes.header}>
             <MySignUp/>
             <MyLogIn/>
         </div>
    )
}

export default Header