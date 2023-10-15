import SignupInputId from "../molecule/SignupInputId";
import SignupInputNick from "../molecule/SignupInputNick";
import SignupInputPwCheck from "../molecule/SignupInputPwCheck";
import SignupInputName from "../molecule/SignupInputName";
import SignupInputWritename from "../molecule/SignupInputWritename";
import SingupBtnBox from '../molecule/SingupBtnBox'
import signup from "../css/signup.module.css"

import {SignupProvider} from '../store/signup-context';

export default function SingupBox(){
    return <>
        <div className={signup.box}>
            <SignupProvider>
                <SignupInputId />
                <br></br>
                <SignupInputPwCheck />
                <br></br>
                <SignupInputName />
                <SignupInputNick />
                <br></br>
                <SignupInputWritename />
                <SingupBtnBox></SingupBtnBox>
            </SignupProvider>
        </div>
    </>
}