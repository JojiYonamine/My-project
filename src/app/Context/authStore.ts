import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { userRef } from "@/utils/firestoreRefs";
import { unsubscribe } from "diagnostics_channel";

interface AuthState {
  // firebase authenticationのユーザー
  currentUser: User | null;
  currentCid: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCid: (cid: string | null) => void;
  initializeAuthListener: () => () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  currentCid: null,
  loading: true,
  setCid: (cid) => set({ currentCid: cid }),
  setUser: (user) => set({ currentUser: user, loading: false }),
  initializeAuthListener: () => {
    set({ loading: true });
    const unsubscribe =  onAuthStateChanged(auth, async (user) => {
      set({ currentUser: user });
      if (user) {
        try {
          const userDoc = await getDoc(userRef(user.uid));
          const cid = userDoc.data()?.cid;
          set({ currentCid: cid, loading: false });
        } catch (err: unknown) {
          set({ currentCid: null, loading: false });
          alert(err);
        }
      } else {
        set({ currentCid: null, loading: false });
      }
    });
    return unsubscribe
  },
}));

export default useAuthStore;
