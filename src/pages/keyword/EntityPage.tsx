/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { EntityModal } from './components/EntityModal';
import { EntityDataComponent } from './components/EntityDataComponent';
import { EntityListComponent } from './components/EntityListComponent';
import { readKeywordContent } from './api/readKeywordAPIs';
// Store
import {useAppStore } from '../../store/store';


export const EntityPage = () => {
  const setEntity = useAppStore((state) => state.setEntity);
  const [open, setOpen] = useState(false);
  const [keywordData, setKeywordData] = useState({});

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onListClick = (key: string) => {
    // console.log(key);
    console.log('The key ******', key);
    readKeywordContent(key as unknown as string)
      .then((item) => {
        if (item.ok) {
          setKeywordData(item.data);
          console.log('The value of the single id ***', item.data);
          setEntity(item.data);
          
        }
      })
      .catch((error) => {
        console.log('The value of the single id ***', error);
      });
  };

  useEffect(() => {}, [keywordData]);

  return (
    <>
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
          style={{ minHeight: '100vh', backgroundColor: 'white' }}
        >
          <EntityListComponent onListClick={onListClick} />
        </div>
        <div className="col-span-6" style={{ minHeight: '100vh' }}>
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: 'white',
            }}
          >
            <EntityDataComponent keywordData={keywordData} />
          </div>
        </div>
      </div>
    </>
  );
};
