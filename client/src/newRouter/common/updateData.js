import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// 소설 정보 업데이트
export async function updateNovel(id, data, origin) {
    const novelRef = doc(db, "novel", id);
    const update = {}
    // title은 수정되지 않음
    const { summary, write_name, cover_img } = data;
    if (summary !== origin.summary) {
        update.summary = summary;
    }
    if (write_name !== origin.write_name) {
        update.write_name = write_name;
    }
    if (cover_img !== origin.cover_img) {
        update.cover_img = cover_img;
    }
    await updateDoc(novelRef, update);
    return true;
}

// 소설 회차 업데이트
export async function updateNovelRound(id) {
    const novelRef = doc(db, "novel", id);
    await updateDoc(novelRef, {
        round: increment(1)
    });
    return true;
}

// 소설 조회수 업데이트
export async function updateNovelView(id) {
    const novelRef = doc(db, "novel", id);
    await updateDoc(novelRef, {
        view: increment(1)
    });
    return true;
}