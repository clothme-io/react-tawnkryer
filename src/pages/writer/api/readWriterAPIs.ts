import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const readSingleKeywordContents = async (
  userId: string,
  project_id: string
): Promise<Result<any, CustomError>> => {
  try {
    const q = query(
      collection(db, 'writer'),
      where('account_id', '==', userId),
      where('project_id', '==', project_id)
    );
    const keywords: DocumentData[] = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        keywords.push(doc.data());
      });
      console.log('Current cities in CA: ', keywords.join(', '));
    });
    return { ok: true, value: keywords };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const readSingleKeywordContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const unsub = onSnapshot(doc(db, 'writer', docId), (doc) => {
      console.log('Current data: ', doc.data());
      return doc.data();
    });
    console.log('Got here =====', unsub);
    return { ok: true, value: unsub };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};
