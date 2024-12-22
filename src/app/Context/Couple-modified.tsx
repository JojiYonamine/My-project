"use client"
import { auth, db } from "@/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface CoupleContextProps {
    user: { uid: string; email: string | null; name: string | null } | null;
    coupleId: string | null;
    loading: boolean;
}

const CoupleContext = createContext<CoupleContextProps>({
    user: null,
    coupleId: null,
    loading: true,
});


export const CoupleProvider:React.FC<{ children: React.ReactNode }> =({children}) => {
    const[user,setUser] = useState<{ uid: string; email: string | null; name: string | null } | null>(null);
    const[coupleId,setCoupleId] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true); 


    useEffect(() => {
        //console.log("useCouple開始")
        const unSubscribeAuth = onAuthStateChanged (auth, async (firebaseUser) =>{
            console.log("onAuthStateChanged呼び出し");

            if(!firebaseUser){
                //console.log("ログインしろ！")
                setUser(null);
                setCoupleId(null);
                setLoading(false)
                return;
            }
            const userRef = doc(db,"users",firebaseUser.uid);
            const userDoc = await getDoc(userRef)
            const userdata = userDoc.data()
            if(!userdata || !userdata.cid){
                //console.log("cidなし")
                setUser({
                    uid:firebaseUser.uid,
                    email:firebaseUser.email,
                    name:firebaseUser.displayName
                });
                setCoupleId(null);
                setLoading(false)
                return;
            }
            setUser({
                uid:firebaseUser.uid,
                email:firebaseUser.email,
                name:firebaseUser.displayName
            });
            setCoupleId(userdata.cid);
            setLoading(false)
            })
            ;return () => {
                //console.log("クリーンアップ開始");
                unSubscribeAuth();
                console.log("unsubscribe");
            }
    },[]);
    return (
        <CoupleContext.Provider value={{ user, coupleId, loading }}>
          {children}
        </CoupleContext.Provider>
      );
}

export const useCouple = () => {
    return useContext(CoupleContext);
  };

//   export const CoupleProvider:React.FC<{ children: React.ReactNode }> =({children}) => {
//     const[user,setUser] = useState<{ uid: string; email: string | null; name: string | null } | null>(null);
//     const[coupleId,setCoupleId] = useState<string|null>(null);
//     const [loading, setLoading] = useState<boolean>(true); 


//     useEffect(() => {
//         //console.log("useCouple開始")
//         const unSubscribeAuth = onAuthStateChanged (auth, async (firebaseUser) =>{
//             console.log("onAuthStateChanged呼び出し");

//             if(!firebaseUser){
//                 //console.log("ログインしろ！")
//                 setUser(null);
//                 setCoupleId(null);
//                 setLoading(false)
//                 return;
//             }
//             const userRef = doc(db,"users",firebaseUser.uid);
//             const userDoc = await getDoc(userRef)
//             const userdata = userDoc.data()
//             if(!userdata || !userdata.cid){
//                 //console.log("cidなし")
//                 setUser({
//                     uid:firebaseUser.uid,
//                     email:firebaseUser.email,
//                     name:firebaseUser.displayName
//                 });
//                 setCoupleId(null);
//                 setLoading(false)
//                 return;
//             }
//             setUser({
//                 uid:firebaseUser.uid,
//                 email:firebaseUser.email,
//                 name:firebaseUser.displayName
//             });
//             setCoupleId(userdata.cid);
//             setLoading(false)
//             })
//             ;return () => {
//                 //console.log("クリーンアップ開始");
//                 unSubscribeAuth();
//                 console.log("unsubscribe");
//             }
//     },[]);
//     return (
//         <CoupleContext.Provider value={{ user, coupleId, loading }}>
//           {children}
//         </CoupleContext.Provider>
//       );
// }

// export const useCouple = () => {
//     return useContext(CoupleContext);
//   };

// if(firebaseUser){
            //     const userRef = doc(db,"users",firebaseUser.uid);
            //     const userDoc = await getDoc(userRef)
            //     const userdata = userDoc.data()
            //     if (userdata && userdata.cid){
            //         console.log(userdata.cid)
            //         setUser({
            //             uid:firebaseUser.uid,
            //             email:firebaseUser.email,
            //             name:firebaseUser.displayName
            //         });
            //         setCoupleId(userdata.cid);
            //         setLoading(false)
            //     }else{
            //         console.log("cidなし")
            //         setUser({
            //             uid:firebaseUser.uid,
            //             email:firebaseUser.email,
            //             name:firebaseUser.displayName
            //         });
            //         setCoupleId(null);
            //         setLoading(false)
            //     }
            // }else{
            //     setUser(null);
            //     setCoupleId(null);
            //     setLoading(false)
            // }