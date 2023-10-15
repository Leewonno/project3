import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import axios from 'axios';
import novel from "../css/novel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import A from '../atom/A';

export default function Novel(){

    const params = useParams();

    const [searchParams] = useSearchParams();
    const round = searchParams.get("round");

    const [data, setData] = useState({});
    const [content, setContent] = useState([]);
    const [slideCount, setSlideCount] = useState(0);
    const [rangeValue, setRangeValue] = useState(1);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/novel/round",
                params:{
                    round,
                    id:params.id,
                }
            })
            setData(res.data.list);
            const gapDelete = res.data.list.content.split('\n').filter(Boolean);
            setContent(gapDelete);
        }

        getData();
        console.log(data);
    }, [round]);

    useEffect(()=>{
        setRangeValue(slideCount + 1);
    }, [slideCount])

    const handleRangeChange = (e)=>{
        setRangeValue(Number(e.target.value));
        setSlideCount(rangeValue - 1);
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
                <div><A url={"/n/"+params.id} className={novel.infoBtn}>목록</A></div>
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
            {slideCount ===  content.length - 1 ? (<div className={novel.writerBox}><div className={novel.writerTitle}>작가의 말</div><div className={novel.writerComment}>{data.writer_comment}</div></div>) : (<div></div>)}
            
        </div>
    </>
}