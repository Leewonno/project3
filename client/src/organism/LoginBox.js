import Button from "../atom/Button";
import login from "../css/login.module.css";
import A from "../atom/A";
import LoginInputId from "../molecule/LoginInputId";
import LoginInputPw from "../molecule/LoginInputPw";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/login-context";
import { postLogin } from "../newRouter/common/postData";

export default function LoginBox() {

    const context = useContext(LoginContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            email: context.loginIdInput,
            password: context.loginPwInput,
        }
        const res = await postLogin(data);
        if (res) {
            const user = {
                email: res.email,
                name: res.name,
                nick: res.nick,
                write_name: res.write_name,
            }
            context.setCookie("user", user);
            navigate("/");
        }
    }

    // const handleLogin = async ()=>{
    //     const result = await axios({
    //         method:"POST",
    //         url:'https://port-0-novelcutserver-12fhqa2blnvnggha.sel5.cloudtype.app/login',
    //         data:{
    //             userid:value.loginIdInput,
    //             pw:value.loginPwInput,
    //         }
    //     })

    //     // console.log(result.data.result);
    //     if(result.data.result){
    //         alert("로그인 성공!");
    //         value.setCookie("user", result.data.token);
    //         navigate("/");
    //     }else{
    //         alert(result.data.message);
    //     }
    // }

    return <>
        <div className={login.box}>
            <div className={login.input_box}>
                <LoginInputId />
                <LoginInputPw />
            </div>
            <div className={login.button_box}>
                <Button className={login.login_btn} onClick={() => { handleLogin() }} onKeyDown={() => {handleLogin()}}>로그인</Button>
                {/* <Button className={login.login_btn} onClick={()=>{handleLogin()}}>로그인</Button> */}
            </div>
            <div className={login.signup_box}>
                <A url="/signup">회원가입</A>
                |
                <A>비밀번호 찾기</A>
            </div>
        </div >

    </>
}