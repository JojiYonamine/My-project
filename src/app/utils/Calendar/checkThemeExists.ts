import { getDocs, query, where } from "firebase/firestore"
import { calendarsRef } from "../firestoreRefs"

export const checkThemeExists = async (cid:string, theme:string):Promise<boolean> => {
    const q=query(calendarsRef(cid),where("theme","==",theme))
    const snapShot = await getDocs(q);
    return !snapShot.empty
}