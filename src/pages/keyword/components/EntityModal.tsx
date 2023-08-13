/* eslint-disable jsx-a11y/label-has-associated-control */
import { nanoid } from 'nanoid';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import type { FormInstance } from 'antd/es/form';
// API function
import React from 'react';
import { addKeywordData } from '../api/addKeywordAPIs';

const { Option } = Select;

interface EntityProps {
  open: boolean;
  handleCancel: any;
  setOpen: any;
}

export function EntityModal({ open, handleCancel, setOpen }: EntityProps) {
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const formRef = React.useRef<FormInstance>(null);

  const onFinish = async (values: any) => {
    setLoading(true);
    onReset();
    console.log(values);
    const keywordId = nanoid();
    const email = localStorage.getItem('tempUser');
    const date = Date.now() as unknown as string;
    const url = values.entityUrl === undefined ? '' : values.entityUrl;
    const keywordInput = {
      id: keywordId,
      data: {
        account_id: 'account.id',
        project_id: '',
        created_at: date,
        updated_at: date,
        status: 'entity',
        processing: true,
        contentType: values.contentType,
        email,
        details: {
          entity: values.entity,
          entityUrl: url,
        },
      },
    };
    const response = await addKeywordData(keywordInput);
    setLoading(false);
    if (response.ok) {
      setOpen(false);
    } else {
      console.log('the error message ', response.error);
      messageApi.open({
        type: 'error',
        content: response.error.message,
      });
    }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Add New Entity Or Cover More Topics"
      onCancel={handleCancel}
      footer={null}
    >
      <div className="py-6">
        {contextHolder}
        <Form
          ref={formRef}
          name="control-ref"
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <Form.Item
            name="contentType"
            label="Content Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a content type" allowClear>
              <Option value="topicalAuthority">Topical Authority</Option>
              <Option value="topicalGap">Topical Gap</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('contentType') === '' ? (
                <Form.Item
                  name="customizeContentType"
                  label="Customize Content Type"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item
            name="entity"
            label="Entity"
            rules={[{ required: true }, { type: 'string', min: 3 }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="entityUrl"
            label="Entity Url"
            initialValue=""
            rules={[
              { type: 'url', warningOnly: true },
              { type: 'string', min: 6 },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button htmlType="button" onClick={onReset} className="mr-3">
              Reset
            </Button>
            <Button
              type="default"
              htmlType="submit"
              className="bg-black text-white"
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
