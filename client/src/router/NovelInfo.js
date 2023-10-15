import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import A from '../atom/A';
import novelinfo from "../css/novelInfo.module.css";

export default function NovelInfo(){

    const params = useParams();
    const navigate = useNavigate();

    const [info, setInfo] = useState([]);
    const [list, setList] = useState([]);
    const [firstRound, setFirstRound] = useState(1);
    const [coverImg, setCoverImg] = useState('');

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios({
                method:"GET",
                url:"http://localhost:8000/novel/info",
                params:{
                    id:params.id
                }
            })

            if(res.data.result){
                console.log(res);
                setInfo(res.data.info);
                setList(res.data.list);
                setFirstRound(res.data.list[0].round);
                setCoverImg(res.data.info[0].cover_img);
            }
            
        }

        getData();

    }, [params])

    const handleFirst = ()=>{
        navigate('/n/'+params.id+"/detail?round="+firstRound);
    }

    return <>
        <div className={novelinfo.novelinfo}>
            {info.map((value, index)=>{
                return (
                <div key={index} className={novelinfo.infoBox}>
                    <div className={novelinfo.coverBox}>
                        <img className={novelinfo.coverImg} src={value.cover_img} alt='커버이미지'></img>
                    </div>
                    <div className={novelinfo.dataBox}>
                        <div className={novelinfo.dataBoxTop}>
                            <div className={novelinfo.name}>
                                {value.name}
                            </div>
                            <div className={novelinfo.data}>
                                <div className={novelinfo.dataText}>{value.write_name}</div>
                                <div className={novelinfo.dataText}>|</div>
                                <div className={novelinfo.dataText}>{value.genre}</div>
                            </div>
                        </div>
                        
                        <div className={novelinfo.dataBoxBottom}>
                            <div className={novelinfo.summary}>{value.summary}</div>
                            <div><button className={novelinfo.firstRound} onClick={handleFirst}>첫회보기</button></div>
                        </div>
                    </div>
                </div>
                )
            })}
            <div>
                <div className={novelinfo.roundInfo}>작품 회차(<span>{list.length}</span>)</div>
                {list.slice(0).reverse().map((value, index)=>{
                    return (
                    <div key={index} className={novelinfo.roundBox}>
                        <A url={"/n/"+params.id+"/detail?round="+value.round} className={novelinfo.roundItem}>
                            <div>
                                <img src={coverImg} className={novelinfo.roundImg} alt='커버이미지'></img>
                            </div>
                            <div className={novelinfo.round}>
                                {list.length - index}.
                            </div>
                            <div className={novelinfo.title}>
                                {value.title}
                            </div>
                        </A>
                    </div>
                    )
                })}
            </div>
        </div>
    </>
}