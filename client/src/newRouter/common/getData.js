import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

// 특정 작품 정보 가져오기
export async function getNovel(id) {
    if (id === undefined || id === null) {
        return;
    }
    if (id.length === 0) {
        return;
    }
    const docRef = doc(db, "novel", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { result: true, data: docSnap.data() }
    } else {
        return { result: false };
    }
}

// 특정 유저가 작품 목록 가져오기
export async function getNovelList(params) {
    
}

// export async function getNovelList() {
//     let result = [];
//     const querySnapshot = await getDocs(collection(db, "novel"));
//     querySnapshot.forEach((doc) => {
//         result.push(doc.data());
//     });
//     return result;
// }

export async function getReconetNovelList() {
    let result = [];
    const docRef = collection(db, "novel");
    const q = query(docRef, orderBy("create_at", "desc"), limit(2));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
}

export async function getUser(email) {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
}