/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse } from 'antd';
import { useEffect } from 'react';
// Store

interface DataProps {
  entityData: any;
  data: any;
}

export function ClusterSubCollectionComponent({ entityData, data }: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log('The data in dataComponent', data);
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
        {/* {contextHolder} */}
        <p>{data ? data.name : ''}</p>
        <p>{data ? data.type : ''}</p>
        <p>{data ? data.url : ''}</p>
      </div>
      <br />
    </div>
  );
}
