import {Link} from "react-router-dom";

export default function A(props){
    return <>
        <Link to={props.url} className={props.className} style={{textDecoration:"none", ...props.style}} onClick={props.onClick}>
            {props.children}
        </Link>
    </>
}