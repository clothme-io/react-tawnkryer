/* eslint-disable prettier/prettier */
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase/firebaseConfig';
import { CustomError } from '../../../lib/util/customError';
import { Result } from '../../../lib/util/resultType';

export const updateSubClusterCollection = async (
    subClusterId: string,
    details: any
): Promise<Result<any, CustomError>> => {
    try {
        const clusterDocRef = doc(db, 'subCluster', subClusterId)
        await updateDoc(clusterDocRef, details);
        return { ok: true, data: 'Successfully Added' };
    } catch (err) {
        const error = new CustomError(500, 'Server Unresoponsive at this time', err);
        return { ok: false, error };
    }
};

