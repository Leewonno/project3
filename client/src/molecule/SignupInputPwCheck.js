import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputPwCheck(){

    const value = useContext(SignupContext);
    
    return <>
        <Input placeholder="비밀번호" type="password" className={signup.input} value={value.pwInput} onChange={(e)=>value.setPwInput(e.target.value)} />
        <Input placeholder="비밀번호 확인" type="password" className={signup.input} value={value.pwCheckInput} onChange={(e)=>value.setPwCheckInput(e.target.value)} />
    </>
}