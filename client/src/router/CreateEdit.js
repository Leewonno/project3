import { useContext, useEffect, useState } from "react";
import create from "../css/create.module.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginStateContext from '../store/loginState-context';

export default function CreateEdit(){

    const login = useContext(LoginStateContext);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const novel_id = searchParams.get("id");

    const [fileName, setFileName] = useState('');
    const [fileUrl, setFileUrl] = useState('https://kdt-wonno2.s3.ap-northeast-2.amazonaws.com/img/1697276031831-cover.png');

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/novel/edit",
                params:{
                    id:novel_id,
                }
            })

            setTitle(res.data.info[0].name);
            setSummary(res.data.info[0].summary);
            setFileUrl(res.data.info[0].cover_img);
        }

        getData()
    },[])

    const handleUpdate = async ()=>{

        if(login.id.length===0){
            alert("로그인 후 이용해주세요!");
            return;
        }

        if(title.length===0){
            alert("제목이 입력되지 않았습니다.");
            return;
        }
        if(summary.length < 30){
            alert("줄거리는 30자 이상 입력되어야 합니다.");
            return;
        }

        if(fileUrl === "https://kdt-wonno2.s3.ap-northeast-2.amazonaws.com/img/1697276031831-cover.png"){
            alert("커버 이미지를 업로드해 주세요!");
            return;
        }

        const update_res = await axios({
            method:"PATCH",
            url:"http://localhost:8000/patch/novel",
            data:{
                name:title,
                summary,
                cover_img:fileUrl,
                id:novel_id,
            }
        })

        console.log(update_res);

        if(update_res.data.result){
            alert("수정되었습니다.");
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
            url:"http://localhost:8000/upload/image",
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
                <button className={create.saveBtn} onClick={handleUpdate}>수정</button>
            </div>
        </div>
    </>
}