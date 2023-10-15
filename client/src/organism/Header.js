import HeaderLogo from "../molecule/HeaderLogo";
import HeaderSearch from "../molecule/HeaderSearch";
import HeaderLogin from "../molecule/HeaderLogin";
import HeaderLogout from "../molecule/HeaderLogout";
import header from "../css/header.module.css";
import LoginStateContext from '../store/loginState-context';
import { useContext } from "react";

export default function Header(){

    const login = useContext(LoginStateContext);

    return(
        <header className={header.header}>
            <div className={header.box}>
                <div className={header.left}>
                    <HeaderLogo className={header.logo}></HeaderLogo>
                </div>
                <div className={header.right}>
                    <HeaderSearch searchBox={header.sc_box} inputClass={header.search} btnClass={header.search_btn}></HeaderSearch>
                    {login.isLogin ? <HeaderLogout btnClass={header.login}></HeaderLogout> : <HeaderLogin btnClass={header.login}></HeaderLogin> }
                    
                </div>
            </div>
        </header>
    )
}