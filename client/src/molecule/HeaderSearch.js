import Button from "../atom/Button";
import Input from "../atom/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch(props){

    const navigator = useNavigate();

    const [search, setSearch] = useState("");

    const handleSearch = ()=>{
        navigator('/search?q=' + search);
    }

    const handleSearchEnter = (e)=>{
        if(e.key === "Enter"){
            navigator('/search?q=' + search);
        }
    }

    return <div className={props.searchBox}>
        <Input placeholder="검색어를 입력하세요" className={props.inputClass} value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>{handleSearchEnter(e)}}></Input>
        <Button className={props.btnClass}><FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}/></Button>
    </div>
}