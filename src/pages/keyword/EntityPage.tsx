/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { EntityModel } from './components/EntityModel';
import { EntityDataComponent } from './components/EntityDataComponent';
import { EntityListComponent } from './components/EntityListComponent';

export const EntityPage = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
      <EntityModel open={open} handleCancel={handleCancel} setOpen={setOpen} />
      <div className="grid gap-4 grid-cols-8 pt-3">
        <div
          className="col-span-2"
          style={{ minHeight: '100vh', backgroundColor: 'white' }}
        >
          <EntityListComponent />
        </div>
        <div className="col-span-6" style={{ minHeight: '100vh' }}>
          <div
            style={{
              minHeight: '100vh',
              backgroundColor: 'white',
            }}
          >
            <EntityDataComponent />
          </div>
        </div>
      </div>
    </>
  );
};
