import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { userRef } from "@/utils/firestoreRefs";

interface AuthState {
  // firebase authenticationのユーザー
  currentUser: User | null;
  currentCid:string|null
  userDoc:DocumentSnapshot<DocumentData>|null;
  loading: boolean;
  setUser: (user: User | null) => void;
  initializeAuthListener: () => () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  userDoc:null,
  currentCid: null,
  loading: true,
  setUser: (user) => set({ currentUser: user, loading: false }),
  initializeAuthListener: () => {
    set({ loading: true });
    const unsubscribe =  onAuthStateChanged(auth, async (user) => {
      set({ currentUser: user });
      if (user) {
        try {
          const userDoc = await getDoc(userRef(user.uid));
          if(userDoc.exists()){
            set({ userDoc:userDoc, currentCid:userDoc.data().cid, loading: false });
          }else{
            set({ userDoc:null,currentCid:null, loading: false });
          }
          console.log("gotten the data")
        } catch (err: unknown) {
          set({ userDoc: null, loading: false });
          alert(err);
        }
      } else {
        set({ userDoc: null, loading: false });
      }
    });
    return unsubscribe
  },
})
);

export default useAuthStore;
