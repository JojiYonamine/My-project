import { create } from "zustand";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { getDoc } from "firebase/firestore";
import { userRef } from "@/utils/firestoreRefs";

interface AuthState {
  // firebase authenticationのユーザー
  currentUser: User | null;
  currentCid: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setCid: (cid: string | null) => void;
  initializeAuthListenr: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  currentCid: null,
  loading: true,
  setCid: (cid) => set({ currentCid: cid }),
  setUser: (user) => set({ currentUser: user, loading: false }),
  initializeAuthListenr: async () => {
    set({ loading: true });
    onAuthStateChanged(auth, async (user) => {
      set({ currentUser: user });
      if (user) {
        try {
          const userDoc = await getDoc(userRef(user.uid));
          const cid = userDoc.data()?.cid;
          set({ currentCid: cid, loading: false });
        } catch (err: unknown) {
          set({ currentCid: "エラー", loading: false });
          alert(err);
        }
      } else {
        set({ currentCid: null, loading: false });
      }
    });
  },
}));

export default useAuthStore;
