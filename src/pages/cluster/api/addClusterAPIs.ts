import { doc, setDoc } from 'firebase/firestore';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const addClusterData = async (
  clsuterData: any
): Promise<Result<any, CustomError>> => {
  console.log('The input for the addKey *****************', clsuterData);
  try {
    await setDoc(doc(db, 'cluster', clsuterData.id), clsuterData.data, {
      merge: true,
    });
    console.log('Got here =====', clsuterData);
    return { ok: true, data: 'Successfully Added' };
  } catch (err) {
    console.log('Got err =====', err);
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const UpdateClusterData = async (
  clsuterData: any
): Promise<Result<any, CustomError>> => {
  console.log('The input for the addKey *****************', clsuterData);
  try {
    await setDoc(doc(db, 'cluster', clsuterData.id), clsuterData.data, {
      merge: true,
    });
    console.log('Got here =====', clsuterData);
    return { ok: true, data: 'Successfully Added' };
  } catch (err) {
    console.log('Got err =====', err);
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};
