import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then(res =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user,
            })
        }).catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png" alt="" />

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>Sign in With Google</Button>
            </div>
        </div>
    )
}

export default Login;