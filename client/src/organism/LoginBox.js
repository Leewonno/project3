import Button from "../atom/Button";
import login from "../css/login.module.css";
import A from "../atom/A";
import LoginInputId from "../molecule/LoginInputId";
import LoginInputPw from "../molecule/LoginInputPw";

import axios from "axios";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/login-context";

export default function LoginBox(){

    const value = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        console.log(value);
        const result = await axios({
            method:"POST",
            url:'http://localhost:8000/login',
            data:{
                userid:value.loginIdInput,
                pw:value.loginPwInput,
            }
        })

        console.log(result.data.result);
        if(result.data.result){
            alert("로그인 성공!");
            value.setCookie("user", result.data.token);
            navigate("/");
        }else{
            alert(result.data.message);
        }
    }

    return <>
    <div className={login.box}>
        <div className={login.input_box}>
            <LoginInputId />
            <LoginInputPw />
        </div>
        <div className={login.button_box}>
            <Button className={login.login_btn} onClick={()=>{handleLogin()}}>로그인</Button>
        </div>
        <div className={login.signup_box}>
            <A url="/signup">회원가입</A>
            |
            <A>비밀번호 찾기</A>
        </div>
    </div>
        
    </>
}