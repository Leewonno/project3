import Header from "../organism/Header";
import CategoryNav from "../organism/CategoryNav";

export default function NotFound(){
    return <>
        <Header />
        <CategoryNav />
        <div>잘못된 접근입니다.</div>
    </>
}