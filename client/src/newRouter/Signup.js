import SingupBox from '../organism/SignupBox'
import signup from "../css/signup.module.css"

export default function Signup(){

    return <>
        <div className={signup.title}>SIGNUP</div>
        <SingupBox></SingupBox>
    </>
}