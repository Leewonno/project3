import LoginBox from "../organism/LoginBox"
import login from "../css/login.module.css";

import {LoginProvider} from '../store/login-context';

export default function Login(){
    return <>
        <div>
            
            <div className={login.title}>LOGIN</div>
            <LoginProvider>
                <LoginBox></LoginBox>
            </LoginProvider>
        </div>
    </>
}