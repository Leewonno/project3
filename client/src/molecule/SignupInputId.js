import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputId(){

    const value = useContext(SignupContext);

    return <>
        <Input placeholder="아이디" className={signup.input} value={value.idInput} onChange={(e)=>value.setIdInput(e.target.value)}></Input>
    </>
}