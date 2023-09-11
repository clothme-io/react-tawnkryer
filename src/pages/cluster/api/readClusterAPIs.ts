import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  DocumentData,
} from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const readClusterContent = async (
  docId: string
): Promise<Result<any, CustomError>> => {
  try {
    const docRef = doc(db, 'cluster', docId);
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

export const readClusterContents = async (
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  try {
    const cluterQuery = query(
      collection(db, 'cluster'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId),
      where('level_0_parent_id', '==', entityId)
    );

    const querySnapshot = await getDocs(cluterQuery);

    // To get level 1
    // const cluter1Query = query(
    //   collection(db, 'cluster'),
    //   where('account_id', '==', accountId),
    //   where('project_id', '==', projectId),
    //   where('level_0_parent_id', '==', entityId)
    // );

    // const query1Snapshot = await getDocs(cluterQuery);

    // All Data
    const clusterData: { id: string; data: DocumentData }[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log('The value from DB', doc.id, ' => ', doc.data());
      const cluster = { id: doc.id, data: doc.data() };
      clusterData.push(cluster);
    });
    return { ok: true, data: clusterData };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readClusterContentsForEntity = async (
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  try {
    const cluterQuery = query(
      collection(db, 'clusterii'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId),
      where('entity_id', '==', entityId)
    );

    const querySnapshot = await getDocs(cluterQuery);
    const clusterData: { id: string; data: DocumentData }[] = [];

    querySnapshot.forEach((doc) => {
      const cluster = { id: doc.id, data: doc.data() };
      clusterData.push(cluster);
    });
    return { ok: true, data: clusterData };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readFromSubCollectionForEntity = async (
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  try {
    const keywordData = { id: '', value: {} };
    const clusterData: { id: string; data: DocumentData }[] = [];

    const clusterSingle = await readClusterContentWithName(
      'ihfzZKH0uzKkrWUnPEmf',
      'clusterii'
    );
    if (clusterSingle.ok) {
      keywordData.id = clusterSingle.data.id;
      keywordData.value = clusterSingle.data.value as unknown as object;

      const querySnapshot = await getDocs(
        collection(db, 'clusterii', 'ihfzZKH0uzKkrWUnPEmf', 'Dog food')
      );

      querySnapshot.forEach((doc) => {
        const cluster = { id: doc.id, data: doc.data() };
        clusterData.push(cluster);
      });
    }

    return { ok: true, data: { entity: keywordData, level1: clusterData } };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readClusterContentWithName = async (
  docId: string,
  name: string
): Promise<Result<any, CustomError>> => {
  try {
    const docRef = doc(db, name, docId);
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
