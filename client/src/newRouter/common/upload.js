import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase"

// 이미지 업로드
export const uploadCover = async (fileName, file) => {
    const storageRef = ref(storage, `image/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
}