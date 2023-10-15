import { useContext, useState } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputPwCheck(){

    const value = useContext(SignupContext);
    const [pwCheckInput, setPwCheckInput] = useState("");
    
    return <>
        <Input placeholder="비밀번호" type="password" className={signup.input} value={value.pwInput} onChange={(e)=>value.setPwInput(e.target.value)}></Input>
        <Input placeholder="비밀번호 확인" type="password" className={signup.input} value={pwCheckInput} onChange={(e)=>setPwCheckInput(e.target.value)}></Input>
    </>
}