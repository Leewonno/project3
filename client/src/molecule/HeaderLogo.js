import A from "../atom/A";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";

export default function HeaderLogo(props){
    return <>
        <A url="/" className={props.className}><FontAwesomeIcon icon={faScissors} /> NOVELCUT</A>
    </>
}