import { doc, setDoc } from 'firebase/firestore';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const addOutlineData = async (
  id: string,
  account_id: string,
  project_id: string,
  root_entity_id: string,
  outline: any
): Promise<Result<any, CustomError>> => {
  const outlineInput = {
    account_id,
    project_id,
    root_entity_id,
    details: outline,
  };
  try {
    await setDoc(doc(db, 'outline', id), outlineInput, {
      merge: true,
    });
    console.log('Got here =====', outline);
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
