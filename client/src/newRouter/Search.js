import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import search from "../css/search.module.css";
import axios from "axios";
import A from "../atom/A";


export default function Search(){

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [novelList, setNovelList] = useState([]);
    const [writerList, setWriterList] = useState([]);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios({
                method:"GET",
                url:"https://port-0-novelcutserver-12fhqa2blnvnggha.sel5.cloudtype.app/search/query",
                params:{
                    query,
                }
            })

            console.log(res);
            setNovelList(res.data.novelList);
            setWriterList(res.data.writerList);
        }

        getData();
    }, [query])

    return <>
        <div className={search.search}>
            <div className={search.word}>'{query}'에 대한 검색결과</div>
            <div className={search.novelBox}>
                <div className={search.title}>작품명 검색결과</div>
                {novelList.map((value, index)=>{
                    return (
                        <A url={"/n/"+value.id}>
                            <div className={search.searchItem} key={index}>
                                <div className={search.coverImgBox}>
                                    <img className={search.coverImg} src={value.cover_img} alt={value.name}></img>
                                </div>
                                <div className={search.nameBox}>
                                    <div className={search.novelName}>{value.name}</div>
                                    <div className={search.writeName}>{value.write_name}</div>
                                </div>
                            </div>
                        </A>
                    )
                })}
            </div>
            <div className={search.writerBox}>
                <div className={search.title}>필명 검색결과</div>
                {writerList.map((value, index)=>{
                    return (
                        <A url={"/n/"+value.id}>
                            <div className={search.searchItem} key={index}>
                                <div className={search.coverImgBox}>
                                    <img className={search.coverImg} src={value.cover_img} alt={value.name}></img>
                                </div>
                                <div className={search.nameBox}>
                                    <div className={search.novelName}>{value.name}</div>
                                    <div className={search.writeName}>{value.write_name}</div>
                                </div>
                            </div>
                        </A>
                    )
                })}
            </div>
        </div>
    </>
}