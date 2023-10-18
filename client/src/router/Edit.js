import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import A from "../atom/A"
import LoginStateContext from '../store/loginState-context';
import edit from '../css/edit.module.css';

export default function Edit(){

    const login = useContext(LoginStateContext);

    const navigate = useNavigate();

    const [novelList, setNovelList] = useState([]);
    const [novelId, setNovelId] = useState(0);
    const [novelName, setNovelName] = useState("작품을 선택해주세요.");
    const [novelRound, setNovelRound] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writerComment, setWriterComment] = useState("");

    useEffect(()=>{
        const loadList = async ()=>{
            const list = await axios({
                method:"GET",
                url:"http://localhost:8000/novel/list",
                params:{
                    write_name:login.writeName,
                }
            })

            if(list.data.result){
                console.log(list.data.list);
                setNovelList(list.data.list);
            }

        }
        loadList();       
    }, [login])

    const handleSelect = (e)=>{
        novelList.forEach(element => {
            if(element.id === Number(e.target.value)){
                setNovelId(element.id);
                setNovelName(element.name);
                setNovelRound(element.round + 1);
            }
        });
    }

    const handleContent = (e)=>{
        console.log(e.target.value);
        setContent(e.target.value);
    }

    const handleRoundSave = async ()=>{

        console.log(login.id.length);
        if(login.id.length===0){
            alert("로그인 후 이용해주세요!");
            return;
        }

        if(novelId === 0){
            alert("작품을 선택해주세요!");
            return;
        }

        if(title.length < 1){
            alert("회차 제목을 입력하세요!");
            return;
        }

        if(content.length < 100){
            alert("소설의 내용은 100자 이상 입력되어야 합니다.");
            return;
        }

        if(writerComment < 1){
            alert("작가의 말을 입력해주세요!");
            return;
        }

        const round_res = await axios({
            method:"POST",
            url:"http://localhost:8000/novel/round",
            data:{
                novel_id:novelId,
                round:novelRound,
                content:content,
                title:title,
                writer_comment:writerComment,
            }
        })

        if(round_res.data.result){
            alert("회차가 업데이트 되었습니다!");
            navigate("/");
        }
    }


    return <>
        <div className={edit.edit}>
            <div className={edit.novelSelectBox}>
                <div>
                    <select onChange={(e)=>handleSelect(e)} className={edit.novelSelect}>
                        <option value={0}>선택</option>
                        {novelList.map((value, index)=>{
                            return <option key={index} value={value.id}>{value.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <A url="/create" className={edit.newNovel}>새 작품</A>
                </div>
            </div>
            <div>
                <div className={edit.novelName}>{novelName}</div>
            </div>
            <div className={edit.title}>
                <input placeholder="회차 제목" value={title} onChange={(e)=>setTitle(e.target.value)} className={edit.titleInput}></input>
            </div>
            <div className={edit.content}>
                <textarea className={edit.contentInput} spellCheck={false} onChange={(e)=>handleContent(e)}></textarea>
            </div>
            <div className={edit.writerComment}>
                <textarea placeholder="작가의 말" className={edit.writerCommentInput} spellCheck={false} onChange={(e)=>setWriterComment(e.target.value)}></textarea>
            </div>
            <div className={edit.saveBtnBox}>
                <button className={edit.saveBtn} onClick={handleRoundSave}>저장</button>
            </div>
        </div>
    </>
}