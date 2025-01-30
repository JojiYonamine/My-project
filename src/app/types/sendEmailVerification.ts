// メール認証を送る関数

import { sendEmailVerification, User } from "firebase/auth";

export const sendVerification = async (user: User) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_AUTH_URL;
    const actionCodeSettings = {
      url: `${baseUrl}`,
      handleCodeInApp: true,
    };
    await sendEmailVerification(user, actionCodeSettings);
  } catch (err: unknown) {
    alert(err);
  }
};
