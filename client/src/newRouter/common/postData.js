import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getNovel, getUser } from "./getData";
import { updateNovelRound } from "./updateData";

// 소설 생성
export async function createNovel(title, data) {
    const res = await getNovel(title);
    if (res.result) {
        alert("이미 존재하는 작품입니다.")
        return false;
    } else {
        const cres = await setDoc(doc(db, "novel", title), data);
        return true;
    }
}

// 회차 생성
export async function createStory(title, data) {
    const res = await getNovel(title);
    if (res.result) {
        try {
            const storyCollectionRef = doc(db, "novel", title, "story", String(data.round)); // 해당 novel 문서 참조
            await setDoc(storyCollectionRef, data); // story 컬렉션에 문서 추가
            await updateNovelRound(title);
            return true;
        } catch (error) {
            console.error("회차 생성 실패:", error);
            return false;
        }
    } else {
        alert("존재하지 않는 작품입니다.");
        return false;
    }
}

// 회원가입
export async function postSignUp(data) {
    let result = false;
    const { email, password, name, nick, write_name } = data;
    await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const setData = {
                email,
                name,
                nick,
                write_name
            }
            await setDoc(doc(db, "user", email), setData);
            result = true;
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert("이미 사용중인 이메일 입니다.");
            }
            else {
                alert('오류가 발생했습니다. 관리자에게 문의해 주세요.')
            }
        });
    return result;
}

// 로그인
export async function postLogin(data) {
    let result = false;
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = await getUser(email);
            result = user;
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                alert("일치하지 않는 아이디/비밀번호 입니다.");
            }
        });
    return result;
}