/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import { Button, Row, Col, message } from 'antd';
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { EntityModal } from './components/EntityModal';
import { EntityDataComponent } from './components/tables/EntityDataComponent';
import { EntityListComponent } from './components/EntityListComponent';
import { readKeywordContent } from './api/readKeywordAPIs';
import { useAuth } from '../../hooks/useAuth';
// Store & Model
import { useAppStore } from '../../store/store';
import {
  EntityResponseItem,
  transposeSingleEntityModel,
  transposeToEntityModel,
} from './model/entityModel';
import { db } from '../../lib/firebase/firebaseConfig';

export const EntityPage = () => {
  const selectEntity = useAppStore((state) => state.selectEntity);
  const entity = useAppStore((state) => state.selectedEntity);
  const [messageApi, contextHolder] = message.useMessage();
  const [entityData, setEntityData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [stateEntityId, setStateEntityId] = useState('');
  const { addCurrentEntityId } = useAuth();

  // For Entity List Component
  const addEntities = useAppStore((state) => state.addEntities);
  const accountId = useAppStore((state) => state.account.id);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<EntityResponseItem | any>(null);
  const [firstData, setFirstData] = useState<any>(null);

  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onListClick = (key: string) => {
    addCurrentEntityId(key);
    console.log('The value of the single entity id ***', key);
    setStateEntityId(key);
    readKeywordContent(key as unknown as string)
      .then((item) => {
        if (item.ok) {
          const entityFromDB = transposeSingleEntityModel(item.data);
          selectEntity(entityFromDB);
          setFirstData(entityFromDB);
        }
      })
      .catch((error) => {
        messageApi.open({
          type: 'error',
          content: error,
        });
      });
  };

  const getEntities = async () => {
    const response = await readKeywordContent(stateEntityId);
    // console.log('Data from DB ====== ', response);
    if (response.ok) {
      setEntityData(response.data);
    }
    if (!response.ok && response !== undefined) {
      messageApi.open({
        type: 'error',
        content: response.error.message,
      });
    }
  };

  const appendData = (projectId: string) => {
    setLoading(true);

    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', accountId),
      where('project_id', '==', projectId as string)
    );
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const keywords:
        | EntityResponseItem
        | { id: string; value: DocumentData }[] = [];
      querySnapshot.forEach((doc) => {
        keywords.push({ id: doc.id, value: doc.data() });
      });
      const entitiesFromDB = transposeToEntityModel(
        keywords as unknown as EntityResponseItem[]
      );
      setData(entitiesFromDB);
      addCurrentEntityId(entitiesFromDB[0].id);
      setFirstData(entitiesFromDB[0]);
      addEntities(entitiesFromDB);
      selectEntity(entitiesFromDB[0]);
      setLoading(false);
    });
    return () => unSubscribe();
  };

  useEffect(() => {
    if (projectId) {
      appendData(projectId);
    }
  }, []);

  useEffect(() => {
    if (stateEntityId !== '') {
      getEntities();
    }
  }, [entity, stateEntityId]);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={6}>
          <h2 className="text-3xl font-bold tracking-tight mb-0">Entity</h2>
        </Col>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} className="grid justify-end">
          <Button
            type="default"
            size="large"
            onClick={showModal}
            className="bg-black text-white hover:text-white"
          >
            New Entity
          </Button>
        </Col>
      </Row>
      <EntityModal open={open} handleCancel={handleCancel} setOpen={setOpen} />
      <div className="grid gap-4 grid-cols-8 pt-3">
        <div
          className="col-span-2"
          style={
            {
              // minHeight: '100vh',
              // backgroundColor: 'white',
            }
          }
        >
          <EntityListComponent
            loading={loading}
            data={data}
            onListClick={onListClick}
            appendData={appendData}
          />
        </div>
        <div
          className="col-span-6"
          style={
            {
              // minHeight: '100vh'
            }
          }
        >
          <div
            style={
              {
                // minHeight: '100vh',
                // backgroundColor: 'white',
              }
            }
          >
            <EntityDataComponent entityData={entityData} data={firstData} />
          </div>
        </div>
      </div>
    </>
  );
};
