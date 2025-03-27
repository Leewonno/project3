import {createContext, useState} from "react";
import {useCookies} from "react-cookie";

const LoginContext = createContext({
    loginIdInput:"",
    setLoginIdInput:()=>{},
    loginPwInput:"",
    setLoginPwInput:()=>{},
    cookies:"",
    setCookie:()=>{},
    removeCookie:()=>{},
});

export function LoginProvider({children}){
    const [loginIdInput, setLoginIdInput] = useState("");
    const [loginPwInput, setLoginPwInput] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    return <LoginContext.Provider value={{
            loginIdInput, setLoginIdInput,
            loginPwInput, setLoginPwInput,
            cookies, setCookie, removeCookie,
        }}>
        {children}
    </LoginContext.Provider>
}

export default LoginContext;