import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function getNovel(search) {
    if (search === undefined || search === null) {
        return;
    }
    if (search.length === 0) {
        return;
    }
    const docRef = doc(db, "novel", search);
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