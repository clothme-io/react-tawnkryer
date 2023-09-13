import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';
import { db } from '../../../lib/firebase/firebaseConfig';

export const performDelete = async (
  db_identifier: any,
  docId: string,
  element: string
) => {
  if (db_identifier === 'google_autosuggest') {
    const deleteResponse = await deleteGoogleAutoSuggestElement(docId, element);
    if (deleteResponse.ok) return true;
  }
  return false;
};

export const deleteGoogleAutoSuggestElement = async (
  docId: string,
  element: string
): Promise<Result<any, CustomError>> => {
  try {
    let newGoogleAutoSuggest = [];
    const google_autosuggest = await readGoogleAutoSuggestKeywordContent(docId);
    if (google_autosuggest.ok) {
      const googleData =
        google_autosuggest.data.value.google_autosuggest.organic_result;
      newGoogleAutoSuggest = googleData.filter(
        (item: string) => item !== element
      );
    }

    const docRef = doc(db, 'keyword', docId);
    await updateDoc(docRef, {
      google_autosuggest: { organic_result: newGoogleAutoSuggest },
    });

    return { ok: true, data: 'keywordData' };
  } catch (err) {
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const readGoogleAutoSuggestKeywordContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const docRef = doc(db, 'keyword', docId);
    const docSnap = await getDoc(docRef);
    const keywordData = { id: '', value: {} };
    if (docSnap.exists()) {
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
