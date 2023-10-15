import {createContext, useState} from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const LoginStateContext = createContext({
    cookies:"",
    setCookie:()=>{},
    removeCookie:()=>{},
    isLogin:false,
    setIsLogin:()=>{},
    logOut:()=>{},
    nickName:"",
    setNickName:()=>{},
    id:"",
    setId:()=>{},
    writeName:"",
    setWriteName:()=>{},
});

export function LoginStateProvider({children}){

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [isLogin, setIsLogin] = useState(false);
    const [nickName, setNickName] = useState('');
    const [id, setId] = useState('');
    const [writeName, setWriteName] = useState('');

    const logOut = () => {
		removeCookie('user'); // 쿠키를 삭제
		navigate('/'); // 메인 페이지로 이동
		window.location.reload();
	};


    return <LoginStateContext.Provider value={{
        cookies, setCookie, removeCookie,
        isLogin, setIsLogin,
        logOut,
        nickName, setNickName,
        id, setId,
        writeName, setWriteName,
    }}>
        {children}
    </LoginStateContext.Provider>
}

export default LoginStateContext;