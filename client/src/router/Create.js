import { useContext, useState } from "react";
import create from "../css/create.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginStateContext from '../store/loginState-context';

export default function Create(){

    const login = useContext(LoginStateContext);
    const navigate = useNavigate();

    const [fileName, setFileName] = useState('');
    const [fileUrl, setFileUrl] = useState('https://kdt-wonno2.s3.ap-northeast-2.amazonaws.com/img/1697276031831-cover.png');

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [genre, setGenre] = useState('');

    const handleSave = async ()=>{
        if(title.length===0){
            alert("제목이 입력되지 않았습니다.");
            return;
        }
        if(summary.length < 30){
            alert("줄거리는 30자 이상 입력되어야 합니다.");
            return;
        }

        if(genre.length === 0){
            alert("장르를 선택해 주세요.");
            return;
        }

        if(fileUrl === "https://kdt-wonno2.s3.ap-northeast-2.amazonaws.com/img/1697276031831-cover.png"){
            alert("커버 이미지를 업로드해 주세요!");
            return;
        }

        const create_res = await axios({
            method:"POST",
            url:"https://port-0-novelcutserver-12fhqa2blnvnggha.sel5.cloudtype.app/novel/create",
            data:{
                write_name:login.writeName,
                title,
                summary,
                genre,
                cover_img:fileUrl,
            }
        })

        if(create_res.data.result){
            alert("등록되었습니다.");
            navigate('/');
        }
    }

    const handleCover = async (e)=>{
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
	
    	// 확장자 제한
        if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
            alert('jpg, png, jpge 파일만 업로드가 가능합니다.');
            return;
        }

        setFileName(e.target.files[0].name);

        const formData = new FormData();
        formData.append('imgfile', file);

        const cover_res = await axios({
            method:"POST",
            url:"https://port-0-novelcutserver-12fhqa2blnvnggha.sel5.cloudtype.app/upload/image",
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    
        console.log(cover_res);
        setFileUrl(cover_res.data.location);

    }

    return <>
        <div className={create.main}>
            <div className={create.genre}>
                <input type="radio" name="genre" id="romance" value={"로맨스"} hidden onClick={(e)=>setGenre(e.target.value)}></input>
                <label htmlFor="romance" className={create.genreLabel}>로맨스</label>
                <input type="radio" name="genre" id="fantasy" value={"판타지"} hidden onClick={(e)=>setGenre(e.target.value)}></input>
                <label htmlFor="fantasy" className={create.genreLabel}>판타지</label>
                <input type="radio" name="genre" id="oriental" value={"무협"} hidden onClick={(e)=>setGenre(e.target.value)}></input>
                <label htmlFor="oriental" className={create.genreLabel}>무협</label>
                <input type="radio" name="genre" id="lightnovel" value={"라이트노벨"} hidden onClick={(e)=>setGenre(e.target.value)}></input>
                <label htmlFor="lightnovel" className={create.genreLabel}>라이트노벨</label>
                <input type="radio" name="genre" id="normal" value={"일반"} hidden onClick={(e)=>setGenre(e.target.value)}></input>
                <label htmlFor="normal" className={create.genreLabel}>일반</label>
            </div>
            <div className={create.title}>
                <input type="text" placeholder="작품 제목" className={create.titleInput} value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div className={create.summary}>
                <textarea placeholder="줄거리" className={create.summaryInput} value={summary} onChange={(e)=>setSummary(e.target.value)}></textarea>
            </div>
            <div className={create.coverImg}>
                <img alt="커버" src={fileUrl} className={create.coverImgUrl}></img>
                <label htmlFor="cover" className={create.coverLabel}>커버 이미지 업로드</label>
                <div>{fileName}</div>
                {/* <img src=></img> */}
                <input accept="image/*" type="file" id="cover" hidden onChange={(e)=>handleCover(e)}></input>
            </div>
            <div className={create.saveBtnBox}>
                <button className={create.saveBtn} onClick={handleSave}>저장</button>
            </div>
        </div>
    </>
}