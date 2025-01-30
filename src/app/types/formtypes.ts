// ログイン・サインアップ時に用いる

export interface formObjectType {
    email: string;
    password: string;
    confirmPassword: string | null;
  }

export interface validateFormType {
    emailError:boolean,
    passwordError:boolean,
    confirmError:boolean, //ログイン時は常にfalse
}

export interface profileType {
  name:string,
  icon:string,
  birthday:Date,
}

