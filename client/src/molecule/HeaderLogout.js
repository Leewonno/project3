import { useContext } from 'react';
import A from '../atom/A'
import LoginStateContext from '../store/loginState-context';

export default function HeaderLogin(props){
    const value = useContext(LoginStateContext);

    return <>
        <A className={props.btnClass} onClick={()=>value.logOut()}>로그아웃</A>
    </>
}