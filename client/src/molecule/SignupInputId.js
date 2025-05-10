import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputId() {

    const value = useContext(SignupContext);
    const { idCheck, idInput } = value;

    return <>
        <Input placeholder="아이디" className={signup.input} value={value.idInput} onChange={(e) => value.setIdInput(e.target.value)}></Input>
        {!idCheck && idInput.length > 0 ? <span className={signup.alarmText}>아이디는 이메일 형식으로 입력해주세요.</span> : <></>}
    </>
}