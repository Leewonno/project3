import {createContext, useState} from "react";

const SignupContext = createContext({
    idCheck:false,
    setIdCheck:()=>{},
    pwCheck:false,
    setPwCheck:()=>{},
    writeNameCheck:false,
    setWriteNameCheck:()=>{},
    idInput:"",
    setIdInput:()=>{},
    pwInput:"",
    setPwInput:()=>{},
    pwCheckInput:"",
    setPwCheckInput:()=>{},
    nameInput:"",
    setNameInput:()=>{},
    nickInput:"",
    setNickInput:()=>{},
    writeNameInput:"",
    setWriteNameInput:()=>{},
});

export function SignupProvider({children}){
    const [idCheck, setIdCheck] = useState(false);
    const [pwCheck, setPwCheck] = useState(false);
    const [writeNameCheck, setWriteNameCheck] = useState(false);
    const [idInput, setIdInput] = useState("");
    const [pwInput, setPwInput] = useState("");
    const [pwCheckInput, setPwCheckInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [nickInput, setNickInput] = useState("");
    const [writeNameInput, setWriteNameInput] = useState("");


    return <SignupContext.Provider value={{
            idCheck, setIdCheck,
            pwCheck, setPwCheck,
            writeNameCheck, setWriteNameCheck,
            idInput, setIdInput,
            pwInput, setPwInput,
            nameInput, setNameInput,
            nickInput, setNickInput,
            writeNameInput, setWriteNameInput,
            pwCheckInput, setPwCheckInput
        }}>
        {children}
    </SignupContext.Provider>
}

export default SignupContext;