import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db, auth } from './firebaseConfig';
import { CustomError } from '../util/customError';
import { Result } from '../util/resultType';

export async function signUp(
  email: string,
  password: string
): Promise<Result<UserCredential, CustomError>> {
  try {
    const authResult = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { ok: true, value: authResult };
  } catch (e) {
    const error: CustomError = new CustomError(
      500,
      'Error in catch block of sign up',
      e
    );
    return { ok: false, error };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<Result<UserCredential, CustomError>> {
  try {
    const signInResult = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const q = query(
      collection(db, 'project'),
      where('account_id', '==', signInResult.user.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: { id: unknown; data: () => unknown }) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    // console.log("The user after sign in ===", signInResult)
    return { ok: true, value: signInResult };
  } catch (e) {
    const error = new CustomError(500, 'Error in catch block of sign up', e);
    return { ok: false, error };
  }
}

export async function signOut() {
  return auth.signOut();
}
