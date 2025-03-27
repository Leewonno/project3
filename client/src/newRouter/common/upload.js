import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase"

// 이미지 업로드
export const uploadCover = async (fileName, file) => {
    const now = new Date();
    const formattedTime = now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0") + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
    const storageRef = ref(storage, `image/${formattedTime}_${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
}