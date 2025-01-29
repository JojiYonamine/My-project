// ログイン・サインアップ周辺の状態を管理する
import { formObjectType, validateFormType } from "@/types/formtypes";
import { create } from "zustand";


const newForm: formObjectType = {
  email: "",
  password: "",
  confirmPassword: null,
};

const newError:validateFormType = {
  emailError:true,
  passwordError:true,
  confirmError:true
}

interface signStore {
  // invite linkの生成時に用いる
  inviteLink: string | null;
  setInviteLink: (link: string | null) => void;

  //   招待されたユーザーのアカウント作成時に用いる
  inviterId: string | null;
  setInviterId: (inviterId: string | null) => void;
  headerLink: string;
  setHeaderLink: (link: string) => void;

  //   フォームの入力時に用いる
  formObject: formObjectType | null;
  setFormObject: (object: formObjectType | null) => void;

  // フォームのバリデーションに用いる
  formError:validateFormType
  setFormError:(form:validateFormType)=>void

  // ログインかサインアップかの判定用
  isLogin:"login"|"signup"
  setIsLogin:(islogin:"login"|"signup") => void

  loading:boolean
  setLoading:(loading:boolean) => void
}

const useSignStore = create<signStore>((set) => ({
  inviteLink: null,
  setInviteLink: (link) => set({ inviteLink: link }),
  inviterId: null,
  setInviterId: (id) => set({ inviterId: id }),
  headerLink: "/Auth/Login",
  setHeaderLink: (link) => set({ headerLink: link }),
  formObject: newForm,
  setFormObject: (form) => set({ formObject: form }),
  formError:newError,
  setFormError:(form)=>set({formError:form}),
  isLogin:"login" as const,
  setIsLogin:(isLogin) => set({isLogin:isLogin}),
  loading:false,
  setLoading:(loading)=>set({loading:loading})
}));

export default useSignStore;
