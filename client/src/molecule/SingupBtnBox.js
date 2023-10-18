import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SignupContext from "../store/signup-context";

import axios from "axios";
import Button from "../atom/Button";


export default function SingupBtnBox(){
    const navigate = useNavigate();
    const value = useContext(SignupContext);

    const handleSignup = async ()=>{
        console.log(value.idInput, value.pwInput, value.nameInput, value.nickInput, value.writeNameInput)
        if(value.idCheck && value.pwCheck && value.writeNameCheck){
            const result = await axios({
                method:"POST",
                url:"https://port-0-project3-server-euegqv2blnvezvrk.sel5.cloudtype.app/signup",
                data:{
                    userid: value.idInput,
                    pw:value.pwInput,
                    name:value.nameInput,
                    nick:value.nickInput,
                    write_name:value.writeNameInput,
                }
            })

            if(result.data.result){
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            }else{
                alert("오류가 발생했습니다.")
            }
        }
        else{
            alert("중복체크를 완료해주세요!");
        }
        
    }

    return <>
        <Button onClick={()=>handleSignup()}>회원가입</Button>
        <Button onClick={()=>navigate("/login")}>취소</Button>
    </>
}