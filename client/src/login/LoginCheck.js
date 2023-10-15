import axios from 'axios';
import { useContext, useEffect } from 'react';
import LoginStateContext from '../store/loginState-context';

const LoginCheck = () => {
	
	const value = useContext(LoginStateContext);

	const authCheck = async () => { // 페이지에 들어올때 쿠키로 사용자 체크
		const token = value.cookies.user; // 쿠키에서 id 를 꺼내기

		if(token==null){
			value.setIsLogin(false);
			value.setNickName("");
			value.setId("");
			value.setWriteName("");
			return;
		}

		const res = await axios({
			method:"POST",
			url:"http://localhost:8000/login/check",
			data:{
				token
			}
		})

		if(res.data.result){
			value.setIsLogin(true);
			value.setNickName(res.data.nick);
			value.setId(res.data.id);
			value.setWriteName(res.data.write_name);
		}
		else{
			value.setIsLogin(false);
			value.setNickName("");
			value.setId("");
			value.setWriteName("");
			alert("문제가 발생했습니다. 로그아웃 됩니다.");
			value.logOut();
		}
	};

	useEffect(() => {
		authCheck(); // 로그인 체크 함수
	});

	
};
export default LoginCheck;