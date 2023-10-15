import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputName(){
    const value = useContext(SignupContext);

    return <>
        <Input placeholder="이름" className={signup.input} value={value.nameInput} onChange={(e)=>value.setNameInput(e.target.value)}></Input>
    </>
}