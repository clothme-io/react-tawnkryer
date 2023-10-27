/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';
import { updateSubClusterCollection } from '../../cluster/api/updateClusterAPIs';
import { readFromSubCollection } from '../../cluster/api/readClusterAPIs';

export const addClusterToOutline = async (
  outline_id: string,
  details: any
): Promise<Result<any, CustomError>> => {
  const outlineInput = {
    account_id: details.account_id,
    project_id: details.project_id,
    cluster: details.cluster,
    subCluster: details.subCluster,
    processing: details.processing,
    entity_id: details.entity_id,
    title: details.outLineTopic,
  };
  // console.log('Got here outlineInput =====', outlineInput);
  try {
    await setDoc(doc(db, 'outline', outline_id), outlineInput, {
      merge: true,
    });
    await updateSubClusterCollection(details.subCluster.id, {
      processing: false,
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

export const addSubClusterToOutline = async (
  outline_id: string,
  details: any
): Promise<Result<any, CustomError>> => {
  const outlineInput = {
    account_id: details.account_id,
    project_id: details.project_id,
    cluster: details.cluster,
    subCluster: details.subCluster,
    processing: details.processing,
    entity_id: details.entity_id,
    title: details.outLineTopic,
  };
  try {
    // console.log('Got here outlineInput =====', outlineInput);
    await setDoc(doc(db, 'outline', outline_id), outlineInput, {
      merge: true,
    });
    const subClusterRes = await readFromSubCollection(details.subCluster.id);
    let clusterData = [];
    if (subClusterRes.ok) {
      // console.log('details.outLineTopic', `${details.outLineTopic}`);
      clusterData = subClusterRes?.data?.data?.organic_result;
      clusterData.forEach((item: any) => {
        if (item.title === details.outLineTopic) {
          item.processing = false;
        }
      });
    }
    // console.log('Got here outlineInput =====', clusterData);
    await updateSubClusterCollection(details.subCluster.id, {
      organic_result: clusterData,
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

export const addOutlineToArticle = async (
  outline_id: string,
  outline: string,
  details: any
): Promise<Result<any, CustomError>> => {
  const outlineInput = {
    account_id: details.account_id,
    project_id: details.project_id,
    cluster: details.cluster,
    subCluster: details.subCluster,
    processing: details.processing,
    entity_id: details.entity_id,
    title: details.outLineTopic,
    outline_data: outline,
  };
  try {
    // console.log('Got here outlineInput =====', outlineInput);
    await setDoc(doc(db, 'article', outline_id), outlineInput, {
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
