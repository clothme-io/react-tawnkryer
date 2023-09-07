/* eslint-disable react/jsx-no-undef */
import React from 'react';
// import { nanoid } from 'nanoid';
import { Button, Form, Input, message } from 'antd';
import type { FormInstance } from 'antd/es/form';

/* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };
/* eslint-enable no-template-curly-in-string */

export function ProjectCreationForm() {
  const [loading, setLoading] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const formRef = React.useRef<FormInstance>(null);

  const onFinish = async (values: any) => {
    console.log('The value of the default project**********', values);
    setLoading(true);
    // onReset();
    // console.log(values);
    // const keywordId = nanoid();
    // const email = localStorage.getItem('tempUser');
    // const date = Date.now() as unknown as string;
    // const url = values.entityUrl === undefined ? '' : values.entityUrl;
    // const keywordInput = {
    //   id: keywordId,
    //   data: {
    //     account_id: accountId,
    //     project_id: project.id,
    //     created_at: date,
    //     updated_at: date,
    //     status: 'entity',
    //     processing: true,
    //     contentType: values.contentType,
    //     email,
    //     details: {
    //       entity: values.entity,
    //       entityUrl: url,
    //     },
    //   },
    // };
    // const response = await addKeywordData(keywordInput);
    // setLoading(false);
    // if (response.ok) {
    //   setOpen(false);
    // } else {
    //   console.log('the error message ', response.error);
    messageApi.open({
      type: 'error',
      content: undefined,
    });
    // }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <div className="py-6">
      {contextHolder}
      <div className="pb-8 text-lg font-semibold text-zinc-950">
        Add New Project
      </div>
      <Form
        ref={formRef}
        name="control-ref"
        layout="vertical"
        onFinish={onFinish}
        style={{ width: '100%' }}
      >
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
          name="projectName"
          label="Project Name"
          rules={[{ required: true }, { type: 'string', min: 3 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="industry"
          label="Industry"
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
  );
}
