import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const readOutlineContents = async (
  entityId: string,
  accountId: string,
  projectId: string
): Promise<Result<any, CustomError>> => {
  try {
    const outlineQuery = query(
      collection(db, 'outline'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId),
      where('entity_id', '==', entityId)
    );

    const querySnapshot = await getDocs(outlineQuery);

    // All Data
    const outlineData: { id: string; data: DocumentData }[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log('The value from DB', doc.id, ' => ', doc.data());
      const cluster = { id: doc.id, data: doc.data() };
      outlineData.push(cluster);
    });
    return { ok: true, data: outlineData };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const readSingleKeywordContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const unsub = onSnapshot(doc(db, 'outline', docId), (doc) => {
      console.log('Current data: ', doc.data());
      return doc.data();
    });
    console.log('Got here =====', unsub);
    return { ok: true, data: unsub };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};
