import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
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

// 특정 유저가 생성한 작품 목록 가져오기
// id : userid
export async function getNovelList(id) {
    let result = [];
    if (id === undefined || id === null) {
        return result;
    }
    if (id.length === 0) {
        return result;
    }
    const docRef = collection(db, "novel");
    const q = query(docRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    });
    return result;
}

// 특정 작품의 회차 목록 가져오기
export async function getStoryList(id) {
    try {
        const storyCollectionRef = collection(db, "novel", id, "story"); // "story" 컬렉션 참조
        const querySnapshot = await getDocs(storyCollectionRef); // 모든 문서 가져오기
        const storyList = querySnapshot.docs.map(doc => (doc.data()));
        return storyList; // 가져온 회차 목록 반환
    } catch (error) {
        console.error("회차 목록 가져오기 실패:", error);
        return [];
    }
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