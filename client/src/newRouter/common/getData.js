import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function getNovel() {
    console.log(db)
    const docRef = doc(db, "novel", "0dZ9KHRDFIMc7maJksIZ");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

export async function getNovelList() {
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });
}