import { useContext, useEffect } from 'react';
import LoginStateContext from '../store/loginState-context';

const LoginCheck = () => {
	
	const context = useContext(LoginStateContext);

	const authCheck = async () => { // 페이지에 들어올때 쿠키로 사용자 체크
		const token = context.cookies.user; // 쿠키에서 id 를 꺼내기

		if(token==null){
			context.setIsLogin(false);
			context.setNickName("");
			context.setId("");
			context.setWriteName("");
			return;
		}

		const res = token;

		if(res){
			context.setIsLogin(true);
			context.setNickName(res.nick);
			context.setId(res.email);
			context.setWriteName(res.write_name);
		}
		else{
			context.setIsLogin(false);
			context.setNickName("");
			context.setId("");
			context.setWriteName("");
			alert("문제가 발생했습니다. 로그아웃 됩니다.");
			context.logOut();
		}
	};

	// 리팩토링 이전 코드
	// const authCheck = async () => { // 페이지에 들어올때 쿠키로 사용자 체크
	// 	const token = context.cookies.user; // 쿠키에서 id 를 꺼내기

	// 	if(token==null){
	// 		context.setIsLogin(false);
	// 		context.setNickName("");
	// 		context.setId("");
	// 		context.setWriteName("");
	// 		return;
	// 	}

	// 	const res = await axios({
	// 		method:"POST",
	// 		url:"https://port-0-novelcutserver-12fhqa2blnvnggha.sel5.cloudtype.app/login/check",
	// 		data:{
	// 			token
	// 		}
	// 	})

	// 	if(res.data.result){
	// 		context.setIsLogin(true);
	// 		context.setNickName(res.data.nick);
	// 		context.setId(res.data.id);
	// 		context.setWriteName(res.data.write_name);
	// 		// console.log(res.data.id)
	// 	}
	// 	else{
	// 		context.setIsLogin(false);
	// 		context.setNickName("");
	// 		context.setId("");
	// 		context.setWriteName("");
	// 		alert("문제가 발생했습니다. 로그아웃 됩니다.");
	// 		context.logOut();
	// 	}
	// };

	useEffect(() => {
		authCheck(); // 로그인 체크 함수
	});

	
};
export default LoginCheck;