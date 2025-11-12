import { useContext } from "react";
import LoginContext from "../store/login-context";

import Input from "../atom/Input"
import login from "../css/login.module.css"
import { useNavigate } from "react-router-dom";
import { postLogin } from "../newRouter/common/postData";

export default function LoginInputPw(){
    const value = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        if (e.key === 'Enter'){
            if (value.loginIdInput.length === 0 || value.loginPwInput.length === 0){
                return;
            }
            const data = {
                email: value.loginIdInput,
                password: value.loginPwInput,
            }
            const res = await postLogin(data);
            if (res) {
                const user = {
                    email: res.email,
                    name: res.name,
                    nick: res.nick,
                    write_name: res.write_name,
                }
                value.setCookie("user", user);
                navigate("/");
            }
        }
    }

    return <>
        <Input
            placeholder="비밀번호" 
            type="password" 
            className={login.input} 
            value={value.LoginPwInput} 
            onChange={(e)=>value.setLoginPwInput(e.target.value)}
            onKeyDown={(e)=>handleLogin(e)}
        />
    </>
}