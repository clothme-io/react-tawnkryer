import {
    doc,
    getDoc,
    // DocumentData,
  } from 'firebase/firestore';
  
  import { db } from '../../../lib/firebase/firebaseConfig';
  import { CustomError } from '../../../lib/util/customError';
  import { Result } from '../../../lib/util/resultType';
  
  export const readProjects = async (
    account_id: string,
  ): Promise<Result<any, CustomError>> => {
    try {
        const docRef = doc(db, 'project', account_id);
        const docSnap = await getDoc(docRef);
        const projectData = { id: '', value: {} };
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          projectData.id = docSnap.id;
          projectData.value = docSnap.data() as unknown as object;
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }
        return { ok: true, data: projectData };
      } catch (err) {
        const error = new CustomError(500, '', err);
        return { ok: false, error };
      }
  };
  