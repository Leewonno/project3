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
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

export async function getNovelList() {
    const querySnapshot = await getDocs(collection(db, "novel"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}