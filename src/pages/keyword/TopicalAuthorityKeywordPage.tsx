/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { Button, Row, Col } from 'antd';
import { EntityModel } from './components/EntityModel';

export const TopicalAuthorityKeywordPage = () => {
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
        <Col span={6} />
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
    </>
  );
};
