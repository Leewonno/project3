import Button from "../atom/Button";
import Input from "../atom/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function HeaderSearch(props){
    return <div className={props.searchBox}>
        <Input placeholder="검색어를 입력하세요" className={props.inputClass}></Input>
        <Button className={props.btnClass}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
    </div>
}