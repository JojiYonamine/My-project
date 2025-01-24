// 入力されたテーマのカレンダーが存在するか確認する関数
import { getDocs, query, where } from "firebase/firestore"
import { calendarsRef } from "../others/firestoreRefs"

// 存在する時true,しないならfalse
export const checkThemeExists = async (cid:string, theme:string):Promise<boolean> => {
    const q=query(calendarsRef(cid),where("theme","==",theme))
    const snapShot = await getDocs(q);

    return !snapShot.empty
}