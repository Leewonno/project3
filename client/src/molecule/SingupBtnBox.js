import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import SignupContext from "../store/signup-context";
import signup from "../css/signup.module.css";

import Button from "../atom/Button";
import { postSignUp } from "../newRouter/common/postData";


export default function SingupBtnBox() {
    const navigate = useNavigate();
    const context = useContext(SignupContext);
    const { idInput, pwInput, pwCheckInput, nameInput, nickInput, writeNameInput, idCheck, pwCheck, writeNameCheck } = context;
    const { setIdCheck, setPwCheck, setWriteNameCheck } = context;

    useEffect(() => {
        const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
        if (emailRegex.test(idInput)) {
            setIdCheck(true);
        } else {
            setIdCheck(false);
        }
    }, [idInput])

    useEffect(() => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (pwInput !== pwCheckInput || !passwordRegex.test(pwInput)) {
            setPwCheck(false);
        } else {
            setPwCheck(true);
        }
    }, [pwInput, pwCheckInput])

    useEffect(() => {
        const regex = /^[a-zA-Z가-힣0-9\s]+$/;
        if (regex.test(writeNameInput)) {
            setWriteNameCheck(true);
        } else {
            setWriteNameCheck(false);
        }
    }, [writeNameInput])

    const handleSignup = async () => {
        if (!idCheck) {
            alert("아이디를 확인해 주세요!");
            return;
        }
        if (!pwCheck) {
            alert("비밀번호를 확인해 주세요!");
            return;
        }
        if (!setWriteNameCheck) {
            alert("사용할 수 없는 필명입니다.");
            return;
        }
        if (idCheck && pwCheck && writeNameCheck) {
            const data = {
                email: idInput,
                password: pwInput,
                name: nameInput,
                nick: nickInput,
                write_name: writeNameInput,
            }
            const res = await postSignUp(data);
            if (res) {
                alert("환영합니다!");
                navigate("/login");
            }
        }
    }

    return <>
        <Button onClick={() => handleSignup()} className={signup.signupBtn}>회원가입</Button>
        <Button onClick={() => navigate("/login")} className={signup.cancelBtn}>취소</Button>
    </>
}