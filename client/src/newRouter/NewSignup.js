import SingupBox from '../organism/SignupBox'
import signup from "../css/signup.module.css"

export default function NewSignup(){

    return <>
        <div className={signup.title}>회원가입</div>
        <SingupBox />
    </>
}