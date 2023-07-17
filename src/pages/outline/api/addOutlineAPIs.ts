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
    return { ok: true, value: 'Successfully Added' };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const saveMultiKeywordData = async (
  keywordData: any
): Promise<Result<any, CustomError>> => {
  console.log('T am hereee ====', keywordData);
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
  keywordData: any
): Promise<Result<any, CustomError>> => {
  try {
    const keywords = keywordData.data.details.Keywords.split('\n');
    console.log('this is the keywords data ====', keywords);
    console.log('this is the keywordData ====', keywordData);

    if (!keywords) {
      const error = new CustomError(500, '', keywords);
      return { ok: false, error };
    }
    const obj = {
      id: keywordData.id,
      data: {
        account_id: keywordData.data.account_id,
        project_id: keywordData.data.project_id,
        created_at: keywordData.data.created_at,
        details: {
          keywords,
          intent: keywordData.data.details.intent,
          keywordDifficulty: keywordData.data.details.keywordDifficulty,
          maxVolume: keywordData.data.details.maxVolume,
          minVolume: keywordData.data.details.minVolume,
        },
      },
    };
    console.log('I got here ====');
    const response = await saveMultiKeywordData(obj);
    if (!response.ok) {
      const error = new CustomError(500, '', response.error);
      return { ok: false, error };
    }
    console.log('this is the keyword data ====', keywordData);
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
