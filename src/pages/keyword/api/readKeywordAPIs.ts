import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const readKeywordContents = async (
  account_id: string,
  project_id: string
): Promise<Result<any, CustomError>> => {
  try {
    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', account_id),
      where('project_id', '==', project_id)
    );
    const keywords: any = [];
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        keywords.push({ id: doc.id, value: doc.data() });
      });
    });
    unSubscribe();
    // useAppStore.setState({ entities: keywords });
    console.log('Current keywords: ', keywords.values.length);
    return { ok: true, data: keywords };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const readKeywordContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const docRef = doc(db, 'keyword', docId);
    const docSnap = await getDoc(docRef);
    const keywordData = { id: '', value: {} };
    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      keywordData.id = docSnap.id;
      keywordData.value = docSnap.data() as unknown as object;
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
