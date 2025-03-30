import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import search from "../css/search.module.css";
import A from "../atom/A";
import { getSearchData } from "./common/getData";


export default function NewSearch() {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [novelList, setNovelList] = useState([]);
  const [writerList, setWriterList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getSearchData(query);
      console.log(res);
      if (res) {
        const { title, writer } = res;
        setNovelList(title);
        setWriterList(writer);
      }
    }
    getData();
  }, [query])

  return <>
    <div className={search.search}>
      <div className={search.word}>'{query}'에 대한 검색결과</div>
      <div className={search.novelBox}>
        <div className={search.title}>작품명 검색결과</div>
        {novelList.map((value, index) => {
          return (
            <A url={"/n/" + value.title} key={index}>
              <div className={search.searchItem}>
                <div className={search.coverImgBox}>
                  <img className={search.coverImg} src={value.cover_img} alt={value.title}></img>
                </div>
                <div className={search.nameBox}>
                  <div className={search.novelName}>{value.title}</div>
                  <div className={search.writeName}>{value.write_name}</div>
                </div>
              </div>
            </A>
          )
        })}
      </div>
      <div className={search.writerBox}>
        <div className={search.title}>필명 검색결과</div>
        {writerList.map((value, index) => {
          return (
            <A url={"/n/" + value.title} key={index}>
              <div className={search.searchItem}>
                <div className={search.coverImgBox}>
                  <img className={search.coverImg} src={value.cover_img} alt={value.title}></img>
                </div>
                <div className={search.nameBox}>
                  <div className={search.novelName}>{value.title}</div>
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