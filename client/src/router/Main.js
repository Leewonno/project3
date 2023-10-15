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
import A from "../atom/A";


export default function Main(){

    const [slideImg, setSlideImg] = useState([]);
    const [slideCount, setSlideCount] = useState(0);

    useEffect(() => {
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
                            {slideImg.map((value, index)=>{
                                return <img className={main.slideBoxImg} key={index} src={value} alt={'slide' + index} />
                            })}
                        </div>
                        <div className={main.slideBtnBox}>
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" color="white" className={main.slideLeftBtn} onClick={handlePrev}/>
                            <FontAwesomeIcon icon={faChevronRight} size="lg" color="white" className={main.slideRightBtn} onClick={handleNext}/>
                        </div>
                        슬라이드보드
                    </div>
                    <div className={main.recent}>
                        최신작품
                    </div>
                </div>
                <div className={main.second}>
                    <div className={main.popular}>인기작품</div>
                    <div className={main.boxCS}>
                        <A url="/create" className={main.create}><FontAwesomeIcon icon={faMarker} /><span className={main.createText}>작품생성</span></A>
                        <div className={main.submit}>
                            <div><FontAwesomeIcon icon={faPaperPlane} /><span className={main.createText}>투고하기</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}