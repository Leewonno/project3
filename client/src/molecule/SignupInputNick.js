import { useContext } from "react";
import SignupContext from "../store/signup-context";

import Input from "../atom/Input"
import signup from "../css/signup.module.css"

export default function SignupInputNick(){
    
    const value = useContext(SignupContext);

    return <>
        <Input placeholder="닉네임" className={signup.input} value={value.nickInput} onChange={(e)=>value.setNickInput(e.target.value)}></Input>
    </>
}