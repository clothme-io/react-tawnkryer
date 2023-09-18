/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse } from 'antd';
import { useEffect } from 'react';

interface DataProps {
  childrenData: any;
}

export function ClusterSubCollectionCollapseComponent({
  childrenData,
}: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    // console.log('The data in dataComponent', data);
  }, [childrenData]);

  return (
    <div className="pt-4">
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        items={[
          {
            key: `${childrenData.key}`,
            label: `${childrenData.title}`,
            children: (
              <ChildrenComponent childrenData={childrenData.treeData} />
            ),
          },
        ]}
      />
    </div>
  );
}

export function ChildrenComponent({ childrenData }: DataProps) {
  return (
    <>
      {childrenData.map((item: any) => (
        <div key={item.key}>
          <p>{item.title}</p>
        </div>
      ))}
    </>
  );
}
