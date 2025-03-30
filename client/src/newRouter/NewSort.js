import { useEffect, useState } from "react";
import sort from "../css/sort.module.css";
import A from "../atom/A";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { getSortData } from "./common/getData";

export default function NewSort() {

  const [novelList, setNovelList] = useState([]);
  const [roundList, setRoundList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const {popular, recent } = await getSortData();
      setNovelList(popular);
      setRoundList(recent);
    }

    getData();
  }, [])

  return <>
    <div className={sort.sort}>
      <div className={sort.popularBox}>
        <div className={sort.popularTitle}><FontAwesomeIcon icon={faFire} /> 인기작품</div>
        {novelList.map((value, index) => {
          return (
            <A url={"/n/" + value.title} key={index}>
              <div className={sort.popularItem}>
                <div className={sort.popularImgBox}>
                  <img className={sort.popularImg} src={value.cover_img} alt="커버사진"></img>
                </div>
                <div className={sort.popularNameBox}>
                  <div className={sort.popularName}>{value.title}</div>
                  <div className={sort.popularWriterName}>{value.write_name}</div>
                </div>
              </div>
            </A>
          )
        })}
      </div>
      <div className={sort.recentBox}>
        <div className={sort.recentTitle}><FontAwesomeIcon icon={faClock} /> 최신 연재 회차</div>
        {roundList.map((value, index) => {
          return (
            <A key={index} url={"/n/" + value.title + "/detail?round=" + value.round}>
              <div className={sort.recentItem}>
                <div className={sort.recentImgBox}>
                  <img className={sort.recentImg} src={value.cover_img} alt="커버사진"></img>
                </div>
                <div className={sort.recentTextBox}>
                  <div className={sort.recentNovelTitle}>{value.title}</div>
                  <div className={sort.recentNameBox}>
                    {/* <div className={sort.recentName}>{value.title}</div> */}
                    {/* <div className={sort.recentName}>|</div> */}
                    <div className={sort.recentWriterName}>{value.write_name}</div>
                  </div>
                </div>
              </div>
            </A>
          )
        })}
      </div>
    </div>
  </>
}