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
    // console.log('Got here =====', keywordData);
    return { ok: true, value: 'Successfully Added' };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

// used in the MUltiKeyword : to be revisited
export const saveMultiKeywordData = async (
  keywordData: any
): Promise<Result<any, CustomError>> => {
  // console.log('T am hereee ====', keywordData);
  try {
    await setDoc(doc(db, 'keyword', keywordData.id), keywordData.data, {
      merge: true,
    });

    return { ok: true, value: 'Successfully Added' };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const addMultiKeywordData = async (
  inputData: any
): Promise<Result<any, CustomError>> => {
  try {
    // console.log('this is the keywordData ====', inputData);
    const keywords = inputData.data.keywords.keywords.split('\n');
    // console.log('this is the keywords data ====', keywords);

    if (!keywords) {
      const error = new CustomError(500, 'Keywords are missing!', keywords);
      return { ok: false, error };
    }
    const obj = {
      id: inputData.id,
      data: {
        account_id: inputData.data.account_id,
        project_id: inputData.data.project_id,
        created_at: inputData.data.created_at,
        type: inputData.data.type,
        details: {
          keywords,
          keywordDifficulty: inputData.data.keywords.kd,
          maxVolume: inputData.data.keywords.maxVolume,
          minVolume: inputData.data.keywords.minVolume,
        },
      },
    };
    const response = await saveMultiKeywordData(obj);
    if (!response.ok) {
      const error = new CustomError(500, '', response.error);
      return { ok: false, error };
    }
    // console.log('this is the keyword data ====', inputData);
    return { ok: true, value: 'Successfully Added' };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const getOutLineForMultiKeyword = async (
  input: any,
  account: any,
  project: any
) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, account, project }),
  };
  const response = await fetch(
    'http://127.0.0.1:5000/multi-Keyword-outline',
    requestOptions
  );

  const data = await response.json();
  console.log('This is the response ====', data);
};

export const adWordAuth = async () => {
  const response = await fetch('http://127.0.0.1:5000/ping');
  //   const response = await fetch("https://tawnkryer-gfmvm7kfdq-uc.a.run.app/ping")
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};
