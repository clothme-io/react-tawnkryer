/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, message } from 'antd';
import { useEffect, useState } from 'react';
// Store
import { useAppStore } from '../../../store/store';
import { DataTableComponent } from './DataTableComponent';
import { EntityDataTable } from './EntityDataTable';

// API
import { readKeywordContent } from '../api/readKeywordAPIs';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export function EntityDataComponent(props: any) {
  const [entityData, setEntityData] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  // const onChange = (key: string | string[]) => {
  // console.log('Got herer', key);
  // };

  const getEntities = async () => {
    console.log(
      'This is the id that comes from parent component ====== ',
      props.id
    );
    const response = await readKeywordContent(entityId);
    if (response.ok) {
      setEntityData(response.data);
    } else {
      messageApi.open({
        type: 'error',
        content: response.error.message,
      });
    }
  };

  useEffect(() => {
    getEntities();
  }, [entityId]);

  useEffect(() => {
    getEntities();
  }, []);

  // useEffect(() => {}, [entityData, entityId]);

  return (
    <div
      className="pt-8 px-4"
      style={{
        // height: '100vh',
        paddingBottom: 20,
      }}
    >
      <div className="p-10 bg-white">
        {contextHolder}
        <p>{entityData ? entityData.value.contentType : ''}</p>
        <p>{entityData ? entityData.value.details.entity : ''}</p>
        <p>{entityData ? entityData.value.details.entityUrl : ''}</p>
      </div>
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '1',
            label: 'Related Entities',
            children: <EntityDataTable entity={entityData} />,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '2',
            label: 'Related Search',
            children: <p>{text}</p>,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '3',
            label: 'Related Queries',
            children: <p>{text}</p>,
          },
        ]}
      />
      <br />
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: '4',
            label: 'Keywords',
            children: <DataTableComponent />,
          },
        ]}
      />
    </div>
  );
}
