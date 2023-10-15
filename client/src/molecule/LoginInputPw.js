import { useContext } from "react";
import LoginContext from "../store/login-context";

import Input from "../atom/Input"
import login from "../css/login.module.css"

export default function LoginInputPw(){
    const value = useContext(LoginContext);

    return <>
        <Input placeholder="비밀번호" type="password" className={login.input} value={value.LoginPwInput} onChange={(e)=>value.setLoginPwInput(e.target.value)}></Input>
    </>
}