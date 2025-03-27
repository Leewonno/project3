import { useState, useEffect } from "react";
import main from "../css/main.module.css";
import slide from "../image/1.png"
import slide2 from "../image/2.png"
import slide3 from "../image/3.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import A from "../atom/A";
import { getNovel, getNovelList, getReconetNovelList } from "./common/getData";


export default function NewMain() {

  const [slideImg, setSlideImg] = useState([]);
  const [slideCount, setSlideCount] = useState(0);
  const [recentNovel, setRecentNovel] = useState([]);
  const [popularNovel, setPopularNovel] = useState([]);

  useEffect(() => {
    const getRecentData = async () => {
      // getNovel();
      const res = await getReconetNovelList();
      console.log(res)
      setRecentNovel(res);
    }

    const getPopularData = async () => {
      // setPopularNovel(res.data.list);
    }
    // getNovel();
    // getNovelList();
    getRecentData();
    getPopularData();
    setSlideImg([slide, slide2, slide3, slide2, slide3]);
  }, []);

  const handleNext = () => {
    setSlideCount((nextCount) => (nextCount + 1) % slideImg.length);
  };

  const handlePrev = () => {
    setSlideCount((prevCount) => (prevCount - 1 + slideImg.length) % slideImg.length);
  };

  const slideStyle = {
    transform: `translate(-${slideCount * 100}%, 0px)`,
  };


  return (
    <>
      <div className={main.main}>
        <div className={main.first}>
          <div className={main.slide}>
            <div className={main.slideBox} style={slideStyle}>
              {slideImg.map((value, index) => {
                return <img className={main.slideBoxImg} key={index} src={value} alt={'slide' + index} />
              })}
            </div>
            <div className={main.slideBtnBox}>
              <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" className={main.slideLeftBtn} onClick={handlePrev} />
              <FontAwesomeIcon icon={faChevronRight} size="lg" color="white" className={main.slideRightBtn} onClick={handleNext} />
            </div>
          </div>
          <div className={main.recent}>
            <div className={main.recentTitle}><FontAwesomeIcon icon={faClock} /> 최신작품</div>
            <div className={main.recentItem}>
              {recentNovel.map((value, index) => {
                return (
                  <A url={"/n/" + value.title} key={index} className={main.recentBox}>
                    <img className={main.recentImg} src={value.cover_img} alt="최신작품"></img>
                    <div className={main.recentName}>{value.title}</div>
                  </A>
                )
              })}
            </div>
          </div>
        </div>
        <div className={main.second}>
          <div className={main.popular}>
            <div className={main.popularTitle}><FontAwesomeIcon icon={faFire} /> 인기작품</div>
            <div className={main.popularBox}>
              {popularNovel.map((value, index) => {
                return (
                  <A url={"/n/" + value.id} key={index}>
                    <div className={main.popularItem}>
                      <div className={main.popularCoverImgBox}>
                        <img className={main.popularCoverImg} src={value.cover_img} alt="커버이미지"></img>
                      </div>
                      <div className={main.popularName}>
                        {value.name}
                      </div>
                    </div>
                  </A>
                )
              })}
            </div>
            <div className={main.popularMore}><A url="/sort" className={main.popularMoreBtn}>더보기</A></div>
          </div>
          <div className={main.boxCS}>
            <A url="/create" className={main.create}><FontAwesomeIcon icon={faMarker} /><span className={main.createText}>작품생성</span></A>
            <div className={main.submit}>
              <div><FontAwesomeIcon icon={faPaperPlane} /><span className={main.createText}>투고하기</span></div>
            </div>
            <div className={main.declaration}>
              <div><FontAwesomeIcon icon={faCircleInfo} /><span className={main.createText}>신고하기</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}