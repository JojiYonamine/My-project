"use client";

import { auth, db } from "@/config/firebaseConfig";
import {  collection,  doc,  getDocs, query, setDoc, where } from "firebase/firestore";
import { useState } from "react";




const RegisterCouples = () => {
    const [partnerEmail,setPartnerEmail] = useState("")

    const registerCouples = async() =>{
        try{
            if(!auth.currentUser){
                console.log("No user logged in");
                return;
            }
            const user =auth.currentUser
            const current_user_uid = user.uid
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", partnerEmail));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                console.log("Parter Not Found");
                return;
            }
    
            const partnerDoc = querySnapshot.docs[0]
            const partnerId = partnerDoc.id;
    
            const cid = current_user_uid+partnerId;
            const couplesRef = doc(db, "couples", cid);
            await setDoc(couplesRef,{
                cid:cid,
                partner1_id: current_user_uid,
                partner2_id: partnerId,
                createdAt: new Date(),
            })
            console.log("Couple Registered!")
            const docRef1 = doc(db,"users",current_user_uid);
            const docRef2 = doc(db,"users",partnerId)
            await setDoc(docRef1,{
                cid:cid,
                partnerId:partnerId
                },{ merge: true }
            );
            await setDoc(docRef2,{
                cid:cid,
                partnerId:current_user_uid
                },{ merge: true }
            );
        }catch(err:unknown){
            console.error("Error registering couple:",err);
        }
    }    
    return(
        <div>
            <form onSubmit={(e) => {e.preventDefault();registerCouples();}}>
                <input 
                    type="mail" 
                    placeholder="メールアドレス"
                    value = {partnerEmail}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => {setPartnerEmail(e.target.value)}}
                    />
                <button type = "submit"> 検索＆登録 </button>
            </form>
        </div>
    )
}

export default RegisterCouples;