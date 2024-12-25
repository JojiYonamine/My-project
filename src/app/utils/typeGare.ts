import { FieldValue } from "firebase/firestore";

export function ensureUser(
  user: { uid: string; email: string | null; name: string | null } | null
): asserts user is { uid: string; email: string | null; name: string | null } {
  if (!user) {
    throw new Error("User is required but was null");
  }
}

export function ensureUid(uid: string | null): asserts uid is string {
  if (!uid) {
    throw new Error("UID is required but was null");
  }
}
export function ensureCid(cid: string | null): asserts cid is string {
  if (!cid) {
    throw new Error("CID is required but was null");
  }
}

export function ensureDate(data:Date|FieldValue):asserts data is Date{
  if(!(data instanceof Date) || isNaN(data.getTime())){
    throw new Error("data is not date")
  }
}