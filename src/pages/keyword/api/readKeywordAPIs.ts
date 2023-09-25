import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const readAllKeywordContentsForProject = async (
  account_id: string,
  project_id: string
): Promise<Result<any, CustomError>> => {
  try {
    const keywordData: {
      id: string;
      data: DocumentData;
    }[] = [];
    const keywordQuery = query(
      collection(db, 'keyword'),
      where('account_id', '==', account_id),
      where('project_id', '==', project_id)
    );
    const cluterSnapshot = await getDocs(keywordQuery);

    cluterSnapshot.forEach((doc) => {
      const collection = { id: doc.id, data: doc.data() };
      keywordData.push(collection);
    });

    return {
      ok: true,
      data: keywordData,
    };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readKeywordContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const docRef = doc(db, 'keyword', docId);
    const docSnap = await getDoc(docRef);
    const keywordData = { id: '', data: {} };
    if (docSnap.exists()) {
      keywordData.id = docSnap.id;
      keywordData.data = docSnap.data() as unknown as object;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
    return { ok: true, data: keywordData };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const readEntities = async (
  accountId: string,
  projectId: string
): Promise<Result<any, CustomError>> => {
  try {
    const entityQuery = query(
      collection(db, 'keyword'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId)
    );

    const querySnapshot = await getDocs(entityQuery);
    const keywordData = { id: '', value: {} };

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
    return { ok: true, data: keywordData };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};
