import { calendar } from "@/types/types";
import { calendarsRef } from "@/utils/firestoreRefs";
import { getDocs } from "firebase/firestore";

export const fetchCalendars =async(cid:string):Promise<calendar[]> =>{
    const snapShot = await getDocs(calendarsRef(cid));
    return snapShot.docs.map((doc) => ({
        theme: doc.id,
        description: doc.data().description,
        share: doc.data().share,
        createdAt: doc.data().createdAt.toDate()
      }));
}