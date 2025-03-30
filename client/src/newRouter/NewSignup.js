import SingupBox from '../organism/SignupBox'
import signup from "../css/signup.module.css"

export default function NewSignup() {

    return <>
        <div style={{'width': '100%', 'padding': '20px', 'boxSizing': 'border-box', 'display': 'flex', 'justifyContent': 'center', 'flexDirection': 'column', 'alignItems': 'center'}}>
            <div className={signup.title}>회원가입</div>
            <SingupBox />
        </div>
    </>
}