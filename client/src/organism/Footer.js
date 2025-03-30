import footer from "../css/footer.module.css";

export default function Footer() {

    const handleNone = () => {
        alert("준비중입니다.")
    }

    return (
        <footer className={footer.footer}>
            <div className={footer.footerBox}>
                <div className={footer.informationBox}>
                    <div onClick={handleNone} className={footer.information}>공지사항</div>
                    <div className={footer.information}>|</div>
                    <div onClick={handleNone} className={footer.information}>개인정보보호정책</div>
                    <div className={footer.information}>|</div>
                    <div onClick={handleNone} className={footer.information}>고객센터</div>
                    <div className={footer.information}>|</div>
                    <div onClick={handleNone} className={footer.information}>제휴문의</div>
                </div>
                <div className={footer.myArea}>
                    포스코 코딩온 웹 풀스택 과정 프로젝트3 이원노
                </div>
            </div>
        </footer>
    )
}