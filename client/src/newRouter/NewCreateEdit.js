import { useContext, useEffect, useState } from "react";
import create from "../css/create.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginStateContext from '../store/loginState-context';
import { uploadCover } from "./common/upload";
import { getNovel } from "./common/getData";
import { updateNovel } from "./common/updateData";

export default function NewCreateEdit() {

  const login = useContext(LoginStateContext);
  const { writeName } = login;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [origin, setOrigin] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await getNovel(id);
      if (res.result) {
        setTitle(res.data.title);
        setSummary(res.data.summary);
        setFileUrl(res.data.cover_img);
        setOrigin(res.data);
      }
    }
    getData()
  }, [])

  // 저장
  const handleSave = async () => {
    if (!writeName) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (title.length === 0) {
      alert("제목이 입력되지 않았습니다.");
      return;
    }
    if (summary.length < 30) {
      alert("줄거리는 30자 이상 입력되어야 합니다.");
      return;
    }

    // if (genre.length === 0) {
    //   alert("장르를 선택해 주세요.");
    //   return;
    // }

    if (fileUrl === "") {
      alert("커버 이미지를 업로드해 주세요!");
      return;
    }

    // 저장할 데이터
    const data = {
      write_name: writeName,
      title,
      summary,
      // genre,
      cover_img: fileUrl,
      round: 0,
      create_at: new Date()
    }

    // 저장 요청
    const res = await updateNovel(title, data, origin);
    if (res) {
      alert("수정되었습니다.");
      navigate('/');
    }
  }

  const handleCover = async (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();

    // 확장자 제한
    if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
      alert('jpg, png, jpge 파일만 업로드가 가능합니다.');
      return;
    }
    const name = e.target.files[0].name;
    setFileName(name);

    // 커버 이미지 업로드
    const path = await uploadCover(name, file);
    setFileUrl(path);
  }

  const handleFileInput = (e) => {
    if (!writeName) {
      e.preventDefault();
      alert("로그인 후 이용해 주세요.");
    }
  }

  return <>
    <div className={create.main}>
      {/* <div className={create.genre}>
        <input type="radio" name="genre" id="romance" value={"로맨스"} hidden onClick={(e) => setGenre(e.target.value)}></input>
        <label htmlFor="romance" className={create.genreLabel}>로맨스</label>
        <input type="radio" name="genre" id="fantasy" value={"판타지"} hidden onClick={(e) => setGenre(e.target.value)}></input>
        <label htmlFor="fantasy" className={create.genreLabel}>판타지</label>
        <input type="radio" name="genre" id="oriental" value={"무협"} hidden onClick={(e) => setGenre(e.target.value)}></input>
        <label htmlFor="oriental" className={create.genreLabel}>무협</label>
        <input type="radio" name="genre" id="lightnovel" value={"라이트노벨"} hidden onClick={(e) => setGenre(e.target.value)}></input>
        <label htmlFor="lightnovel" className={create.genreLabel}>라이트노벨</label>
        <input type="radio" name="genre" id="normal" value={"일반"} hidden onClick={(e) => setGenre(e.target.value)}></input>
        <label htmlFor="normal" className={create.genreLabel}>일반</label>
      </div> */}
      <div className={create.title}>
        <input type="text" placeholder="작품 제목" className={create.titleInput} value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div className={create.summary}>
        <textarea placeholder="줄거리" className={create.summaryInput} value={summary} onChange={(e) => setSummary(e.target.value)}></textarea>
      </div>
      <div className={create.coverImg}>
        {
          fileUrl ?
            <img alt="커버" src={fileUrl} className={create.coverImgUrl} />
            :
            <></>
        }
        <label onClick={handleFileInput} htmlFor="cover" className={create.coverLabel}>커버 이미지 업로드</label>
        <div>{fileName}</div>
        <input accept="image/*" type="file" id="cover" hidden onChange={(e) => handleCover(e)}></input>
      </div>
      <div className={create.saveBtnBox}>
        <button className={create.saveBtn} onClick={handleSave}>저장</button>
      </div>
    </div>
  </>
}