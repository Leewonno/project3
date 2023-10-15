import { useContext } from "react";
import LoginContext from "../store/login-context";

import Input from "../atom/Input"
import login from "../css/login.module.css"


export default function LoginInputId(){

    const value = useContext(LoginContext);
    return <>
        <Input placeholder="아이디" className={login.input} value={value.loginIdInput} onChange={(e)=>value.setLoginIdInput(e.target.value)}></Input>
    </>
}