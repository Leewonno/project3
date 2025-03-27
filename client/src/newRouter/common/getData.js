import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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

export async function getNovelList() {
    const querySnapshot = await getDocs(collection(db, "novel"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
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