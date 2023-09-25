import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';
import { performDelete } from './deleteAPI';

export const addClusterData = async (
  clsuterData: any
): Promise<Result<any, CustomError>> => {
  try {
    await setDoc(doc(db, 'cluster', clsuterData.id), clsuterData.data, {
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

const keywordDelectType = (input: any) => {
  const db_path: any = {
    google_autosuggest: 'google_autosuggest',
    openAI: 'OpenAI',
    people_also_ask: 'people_also_ask',
    related_queries_top: 'related_queries_top',
  };
  return db_path[input] ?? 'id not found';
};

export const addClusteriiData = async (
  level: number,
  level0_id: string,
  level0_title: string,
  project_id: string,
  account_id: string,
  root_entity_id: string,
  has_child: boolean,
  level1_id: string,
  level1_title: any,
  level2_title?: string
): Promise<Result<any, CustomError>> => {
  const level_1_title = level1_title.keyword;
  const levelTitleSpit = level1_title.key.split('||');

  try {
    const db_identifier = keywordDelectType(levelTitleSpit[1]);
    if (db_identifier === 'id not found')
      return { ok: false, error: db_identifier };

    const response = await performDelete(
      db_identifier,
      root_entity_id,
      level_1_title
    );

    if (Number(level) === 0 && response) {
      await addClusterLevel1Data(
        level0_id,
        level0_title,
        level_1_title,
        project_id,
        account_id,
        root_entity_id,
        has_child
      );

      await UpdateClusteriiData({ id: level0_id, has_child: true });
    }

    if (Number(level) === 1 && response) {
      await addClusterLevel2Data(
        level0_id,
        level0_title,
        level1_id,
        level1_title,
        level2_title as string,
        project_id,
        account_id,
        root_entity_id
      );
    }
    return { ok: true, data: 'Successfully Added' };
  } catch (err) {
    console.log('Got err =====', err);
    const error = new CustomError(500, '', err);
    return { ok: false, error };
  }
};

export const addClusterLevel1Data = async (
  level0_id: string,
  level0_name: string,
  level1_title: string,
  project_id: string,
  account_id: string,
  root_entity_id: string,
  has_child: boolean
): Promise<Result<any, CustomError>> => {
  try {
    const clusteriiRef = collection(db, 'clusterii');
    await addDoc(collection(clusteriiRef, level0_id, level0_name), {
      title: level1_title,
      level_0_id: level0_id,
      level_0_collection_name: level0_name,
      level: 1,
      has_child,
      root_entity_id,
      project_id,
      account_id,
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

export const addClusterLevel2Data = async (
  level0_id: string,
  leve0_name: string,
  level1_id: string,
  level1_name: string,
  level2_title: string,
  project_id: string,
  account_id: string,
  root_entity_id: string
): Promise<Result<any, CustomError>> => {
  try {
    const clusteriiRef = collection(db, 'clusterii');
    await addDoc(
      collection(clusteriiRef, level0_id, leve0_name, level1_id, level1_name),
      {
        title: level2_title,
        level_0_id: level0_id,
        level_0_collection_name: leve0_name,
        level_1_id: level1_id,
        level_1_collection_name: level1_name,
        level: 2,
        root_entity_id,
        project_id,
        account_id,
      }
    );
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

export const UpdateClusteriiData = async (
  clusterData: any
): Promise<Result<any, CustomError>> => {
  try {
    const clusteriiRef = doc(db, 'clusterii', clusterData.id);
    await updateDoc(clusteriiRef, {
      has_child: clusterData.has_child,
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
