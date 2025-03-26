import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function postNovel(title, data) {
    await setDoc(doc(db, "novel", title), data);
}