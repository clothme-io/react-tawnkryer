/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import { Button, Row, Col, message } from 'antd';
import { EntityModal } from './components/EntityModal';
import { EntityDataComponent } from './components/EntityDataComponent';
import { EntityListComponent } from './components/EntityListComponent';
import { readKeywordContent } from './api/readKeywordAPIs';
import { useAuth } from '../../hooks/useAuth';
// Store & Model
import { useAppStore } from '../../store/store';
import { transposeSingleEntityModel } from './model/entityModel';

export const EntityPage = () => {
  const selectEntity = useAppStore((state) => state.selectEntity);
  const entity = useAppStore((state) => state.selectedEntity);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [stateEntityId, setStateEntityId] = useState('');
  const { addCurrentEntityId } = useAuth();

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
        }
      })
      .catch((error) => {
        // console.log('The value of the single id ***', error);
        messageApi.open({
          type: 'error',
          content: error,
        });
      });
  };

  useEffect(() => {}, [entity, stateEntityId]);

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
          <EntityListComponent onListClick={onListClick} />
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
            <EntityDataComponent stateEntityId={stateEntityId} />
          </div>
        </div>
      </div>
    </>
  );
};
