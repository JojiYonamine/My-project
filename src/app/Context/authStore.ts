import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { userRef } from "@/utils/others/firestoreRefs";

interface AuthState {
  // firebase authenticationのユーザー
  currentUser: User | null;
  currentCid: string | null;
  userDoc: DocumentSnapshot<DocumentData> | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  initializeAuthListener: () => () => void;
  setCurrentCid: (sid: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  userDoc: null,
  currentCid: null,
  loading: true,
  setUser: (user) => set({ currentUser: user, loading: false }),
  initializeAuthListener: () => {
    set({ loading: true });
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        try {
          const userDoc = await getDoc(userRef(user.uid));
          if (userDoc.exists()) {
            console.log("ユーザー、CIDあり");
            set({ currentUser: user, userDoc: userDoc, currentCid: userDoc.data().cid, loading: false });
          } else {
            console.log("ユーザーあり、CIDなし");
            set({ currentUser: user, userDoc: null, currentCid: null, loading: false });
          }
        } catch (err: unknown) {
          set({ currentUser: null, userDoc: null, currentCid: null, loading: false });
          alert(err);
        }
      } else {
        console.log("ユーザーなし");
        set({ currentUser: null, userDoc: null, currentCid: null, loading: false });
      }
    });

    return unsubscribe;
  },
  setCurrentCid: (cid) => set({ currentCid: cid }),
}));

export default useAuthStore;
