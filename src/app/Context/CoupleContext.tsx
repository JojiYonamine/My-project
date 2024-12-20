"use client"

import { auth, db } from "@/config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";



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

export const CoupleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const[user,setUser] = useState<{ uid: string; email: string | null; name: string | null } | null>(null);
    const[coupleId,setCoupleId] = useState<string|null>(null);
    const [loading, setLoading] = useState<boolean>(true); // ローディング状態

    useEffect(() => {
        const unSubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser){
                const userRef = collection(db,"users");
                const userQuery = query(userRef, where("uid","==",firebaseUser.uid));

                const unSubscribeUser = onSnapshot(userQuery, (snapshot) => {
                    if(!snapshot.empty){
                        const userData = snapshot.docs[0].data();
                        setUser({
                            uid : firebaseUser.uid,
                            email : firebaseUser.email||null,
                            name : userData.name||null
                        });

                        const couplesRef = collection(db,"couples");
                        const partner1Query = query(couplesRef, where("partner1Id","==",firebaseUser.uid));
                        const partner2Query = query(couplesRef, where("partner2Id","==",firebaseUser.uid));

                        const partner1Unsubscribe = onSnapshot(partner1Query,(partner1Snapshot) => {
                            if(!partner1Snapshot.empty){
                                const doc = partner1Snapshot.docs[0]
                                setCoupleId(doc.id)
                                setLoading(false); 
                            }else{
                                setCoupleId(null)
                                setLoading(false); 
                            }
                        })

                        const partner2Unsubscribe = onSnapshot(partner2Query,(partner2Snapshot) => {
                            if(!partner2Snapshot.empty){
                                const doc = partner2Snapshot.docs[0]
                                setCoupleId(doc.id)
                                setLoading(false); 
                            }else{
                                setCoupleId(null)
                                setLoading(false); 
                            }
                        });

                        return () => {
                            partner1Unsubscribe();
                            partner2Unsubscribe();
                          };
                    }else{
                        setUser(null);
                        setCoupleId(null);
                        setLoading(false); 
                    }
                });return () => unSubscribeUser();
            } else{
                setUser(null);
                setCoupleId(null);
                setLoading(false); 
            }
        });
        return () => unSubscribeAuth();
    },[]);
    return (
        <CoupleContext.Provider value={{ user, coupleId, loading }}>
          {children}
        </CoupleContext.Provider>
      );
};

export const useCouple = () => {
    return useContext(CoupleContext);
  };