import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputWritename(){
    const value = useContext(SignupContext);

    return <>
        <Input value={value.writeNameInput} placeholder="필명" className={signup.input} onChange={(e)=>value.setWriteNameInput(e.target.value)}></Input>
    </>
}