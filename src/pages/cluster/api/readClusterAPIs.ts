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

export const readFromCollectionSubCollectionForEntity = async (
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  try {
    const clusterData: {
      id: string;
      data: DocumentData;
    }[] = [];

    const cluterQuery = query(
      collection(db, 'clusterii'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId),
      where('entity_id', '==', entityId)
    );
    const cluterSnapshot = await getDocs(cluterQuery);

    cluterSnapshot.forEach((doc) => {
      const collection = { id: doc.id, data: doc.data() };
      clusterData.push(collection);
    });

    return {
      ok: true,
      data: clusterData,
    };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readFromSubCollections = async (
  clusterId: string,
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  try {
    const clusterData: {
      id: string;
      data: DocumentData;
    }[] = [];

    const subClusterQuery = query(
      collection(db, 'subCluster'),
      where('cluster.id', '==', clusterId),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId),
      where('entity_id', '==', entityId)
    );

    const snapshot = await getDocs(subClusterQuery);
    snapshot.forEach((doc) => {
      const collection = { id: doc.id, data: doc.data() };
      clusterData.push(collection);
    });

    return {
      ok: true,
      data: clusterData,
    };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readFromSubClusterCollections = async (
  subClusterId: string,
  accountId: string,
  projectId: string,
  entityId: string
): Promise<Result<any, CustomError>> => {
  console.log('THe subClusterId', subClusterId);
  console.log('THe accountId', accountId);
  console.log('THe projectId', projectId);
  console.log('THe entityId', entityId);
  try {
    // const clusterData: {
    //   id: string;
    //   data: DocumentData;
    // }[] = [];

    // const subClusterQuery = query(
    //   collection(db, 'subCluster'),
    //   where('cluster.id', '==', subClusterId),
    //   where('account_id', '==', accountId),
    //   where('project_id', '==', projectId),
    //   where('entity_id', '==', entityId)
    // );

    // const snapshot = await getDocs(subClusterQuery);
    // snapshot.forEach((doc) => {
    //   const collection = { id: doc.id, data: doc.data() };
    //   clusterData.push(collection);
    // });

    // return {
    //   ok: true,
    //   data: clusterData,
    // };

    const docRef = doc(db, 'subCluster', subClusterId);
    const docSnap = await getDoc(docRef);
    const keywordData = { id: '', data: {} };
    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      keywordData.id = docSnap.id;
      keywordData.data = docSnap.data() as unknown as object;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
    return { ok: true, data: keywordData };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

export const readFromSubCollection = async (
  subClusterId: string
): Promise<Result<any, CustomError>> => {
  try {
    console.log('The subClusterID', subClusterId);
    const docRef = doc(db, 'subCluster', subClusterId);
    const docSnap = await getDoc(docRef);
    const keywordData = { id: '', data: {} };
    if (docSnap.exists()) {
      // console.log('Document data:', docSnap.data());
      keywordData.id = docSnap.id;
      keywordData.data = docSnap.data() as unknown as object;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
    return { ok: true, data: keywordData };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};

// Not gonna used
export const readFromSubCollectionCollections = async (
  clusterId: string,
  clusterName: string,
  subClusterID: string,
  subClusterName: string
): Promise<Result<any, CustomError>> => {
  try {
    const clusterData: {
      id: string;
      data: DocumentData;
    }[] = [];

    const subClusterQuery = await getDocs(
      collection(
        db,
        'clusterii',
        clusterId,
        clusterName,
        subClusterID,
        subClusterName
      )
    );

    subClusterQuery.forEach((doc) => {
      const collection = { id: doc.id, data: doc.data() };
      clusterData.push(collection);
    });
    return {
      ok: true,
      data: clusterData,
    };
  } catch (err) {
    const error = new CustomError(
      500,
      'Server Unresoponsive at this time',
      err
    );
    return { ok: false, error };
  }
};
