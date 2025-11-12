import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputPwCheck(){

    const value = useContext(SignupContext);
    const { pwCheck, pwInput, pwCheckInput } = value;
    
    return <>
        <Input placeholder="비밀번호" type="password" className={signup.input} value={value.pwInput} onChange={(e)=>value.setPwInput(e.target.value)} />
        <Input placeholder="비밀번호 확인" type="password" className={signup.input} value={value.pwCheckInput} onChange={(e)=>value.setPwCheckInput(e.target.value)} />
        {
            !pwCheck && pwCheckInput.length > 0 ? 
            <span className={signup.alarmText}>비밀번호가 일치하지 않습니다.</span> :
            !pwCheck && pwInput.length > 0?
            <span className={signup.alarmText}>비밀번호는 영문 대·소문자, 숫자, 특수문자를 포함해야 합니다.</span> :
            <></>
        }
    </>
}