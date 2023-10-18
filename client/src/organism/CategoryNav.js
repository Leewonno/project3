import { useContext } from "react";
import A from "../atom/A";
import nav from '../css/categoryNav.module.css'
import LoginStateContext from "../store/loginState-context";

export default function CategoryNav(){

    const login = useContext(LoginStateContext);

    return <>
        <nav className={nav.nav}>
            <div className={nav.box}>
                <div>
                    <A className={nav.a} url="/sort">연재작품</A>
                </div>
                { login.isLogin ? (<div> <A className={nav.a} url="/edit">내 작품/글쓰기</A> </div>) : (<div></div>) }
                
            </div>
        </nav>
    </>
}