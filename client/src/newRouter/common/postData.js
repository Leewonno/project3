import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function postNovel(title, data) {
    await setDoc(doc(db, "novel", title), data);
}

export async function postSignUp(data) {
    const {email, password, name, nick, write_name} = data;
    console.log(data)
    const res = await createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     console.log(user)
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorMessage)
        // });

    console.log(res)
    
    await setDoc(doc(db, "user", email), data);
}