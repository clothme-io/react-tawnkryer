import { doc, setDoc } from 'firebase/firestore';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const addKeywordData = async (
  keywordData: any
): Promise<Result<any, CustomError>> => {
  try {
    await setDoc(doc(db, 'keyword', keywordData.id), keywordData.data, {
      merge: true,
    });
    console.log('Got here =====', keywordData);
    return { ok: true, data: 'Successfully Added' };
  } catch (err) {
    console.log('Got err =====', err);
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};
