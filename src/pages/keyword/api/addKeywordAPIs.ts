import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const addKeywordData = async (
  keywordData: any
): Promise<Result<any, CustomError>> => {
  console.log('The input for the addKey *****************', keywordData);
  try {
    await setDoc(doc(db, 'keyword', keywordData.id), keywordData.data, {
      merge: true,
    });
    return { ok: true, data: 'Successfully Added' };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};
