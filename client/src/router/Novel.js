import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import axios from 'axios';
import novel from "../css/novel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import LoginStateContext from '../store/loginState-context';
import { useContext } from "react";
import A from '../atom/A';

export default function Novel(){

    const params = useParams();
    const [searchParams] = useSearchParams();
    const round = searchParams.get("round");

    const login = useContext(LoginStateContext);

    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [content, setContent] = useState([]);
    const [slideCount, setSlideCount] = useState(0);
    const [rangeValue, setRangeValue] = useState(1);
    const [prev, setPrev] = useState({});
    const [next, setNext] = useState({});

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios({
                method:"GET",
                url:"https://port-0-project3-server-euegqv2blnvezvrk.sel5.cloudtype.app/novel/round",
                params:{
                    round,
                    id:params.id,
                }
            })
            setData(res.data.list);
            setPrev(res.data.prev);
            setNext(res.data.next);
            const gapDelete = res.data.list.content.split('\n').filter(Boolean);
            setContent(gapDelete);
        }
        getData();
    }, [round]);

    useEffect(()=>{
        setRangeValue(slideCount + 1);
    }, [slideCount])

    const handleRangeChange = (e)=>{
        setRangeValue(Number(e.target.value));
        setSlideCount(rangeValue - 1);
    }

    const handleDelete = async ()=>{

        if(window.confirm("정말 삭제하시겠습니까?")){

        }
        else{
            return;
        }

        const res = await axios({
            method:"DELETE",
            url:"https://port-0-project3-server-euegqv2blnvezvrk.sel5.cloudtype.app/novel/round/delete",
            data:{
                novel_id:params.id,
                round:round,
            }
        })

        console.log(res);
        if(res.data.result){
            alert("삭제되었습니다.");
            navigate('/n/'+params.id);
        }
    }

    const handleNext = () => {
        setSlideCount((nextCount) => (nextCount + 1) % content.length);
    };
    
    const handlePrev = () => {
        setSlideCount((prevCount) => (prevCount - 1 + content.length) % content.length);
    };
    
    const slideStyle = {
        transform: `translate(-${slideCount * 100}%, 0px)`,
    };

    return <>
        <div className={novel.novel}>
            <div className={novel.boxTop}>
                <div className={novel.title}>{data.title}</div>
                <div className={novel.infoBox}>
                    {login.writeName === data.writeName ? <div className={novel.writerBtnBox}><div className={novel.deleteBtn} onClick={handleDelete}>삭제</div><A url={"/edit/detail?id="+params.id+"&round="+round} className={novel.modifyBtn}>수정</A></div> : <div></div>}
                    <A url={"/n/"+params.id} className={novel.infoBtn}>목록</A>
                </div>
            </div>
            <div>
                <div className={novel.slide}>
                    <div className={novel.slideBox} style={slideStyle}>
                        {content.map((value, index)=>{
                            return (
                                <div className={novel.slideContent} key={index}>{value}</div>
                            )
                        })}
                    </div>
                    <div className={novel.slideBtnBox}>
                        {slideCount ===  0 ? <div></div> : <FontAwesomeIcon icon={faChevronLeft} size="lg" className={novel.slideLeftBtn} onClick={handlePrev}/>}
                        {slideCount ===  content.length - 1 ? <div></div> : <FontAwesomeIcon icon={faChevronRight} size="lg" className={novel.slideRightBtn} onClick={handleNext}/>}
                    </div>
                    
                </div>
            </div>
            <div>
                <input className={novel.rangeInput} type={"range"} min={1} max={content.length} step={1} value={rangeValue} onClick={(e)=>handleRangeChange(e)} onChange={(e)=>handleRangeChange(e)}></input>
            </div>
            <div className={novel.page}>
                {rangeValue} / {content.length}
            </div>
            <div className={novel.prevNextBtnBox}>
                {prev === null ? <div></div> : <div className={novel.prevNextBtn} title="이전 화"><A url={"/n/"+params.id+"/detail?round="+prev.round}><FontAwesomeIcon color='black' icon={faCircleChevronLeft}/></A></div>  }
                {next === null ? <div></div> : <div className={novel.prevNextBtn} title="다음 화"><A url={"/n/"+params.id+"/detail?round="+next.round}><FontAwesomeIcon color='black' icon={faCircleChevronRight}/></A></div> }
            </div>
            {slideCount ===  content.length - 1 ? (<div className={novel.writerBox}><div className={novel.writerTitle}>작가의 말</div><div className={novel.writerComment}>{data.writer_comment}</div></div>) : (<div></div>)}
            
        </div>
    </>
}