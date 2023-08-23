import {
  collection, query, where, getDocs, DocumentData
    // DocumentData,
  } from 'firebase/firestore';
  
  import { db } from '../../../lib/firebase/firebaseConfig';
  import { CustomError } from '../../../lib/util/customError';
  import { Result } from '../../../lib/util/resultType';
  
  export const readProjects = async (
    account_id: string,
  ): Promise<Result<any, CustomError>> => {
    try {
        const projectQuery = query(collection(db, "project"), where("account_id", "==", account_id));
        const querySnapshot = await getDocs(projectQuery)
        const projectData: { id: string; value: DocumentData; }[] = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          projectData.push({ id: doc.id, value: doc.data()})
        });
        return { ok: true, data: projectData };
      } catch (err) {
        const error = new CustomError(500, '', err);
        return { ok: false, error };
      }
  };
  