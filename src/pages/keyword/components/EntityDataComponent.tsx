/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, message } from 'antd';
import { useEffect } from 'react';
// Store
import { DataTableComponent } from './DataTableComponent';
import { EntityDataTable } from './EntityDataTable';

interface DataProps {
  entityData: any;
  data: any;
}

export function EntityDataComponent({ entityData, data }: DataProps) {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log('The data in dataCompoenet', data);
  }, [entityData, data]);

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
        <p>{data ? data.name : ''}</p>
        <p>{data ? data.type : ''}</p>
        <p>{data ? data.url : ''}</p>
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
            key: '4',
            label: 'Related Keywords',
            children: <DataTableComponent />,
          },
        ]}
      />
    </div>
  );
}
