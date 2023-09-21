/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Collapse, Checkbox, Empty } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { readFromSubCollectionCollections } from '../api/readClusterAPIs';

interface DataProps {
  childrenData: any;
}

export function ClusterSubCollectionCollapseComponent({
  childrenData,
}: DataProps) {
  // const [messageApi, contextHolder] = message.useMessage();

  const CheckboxGroup = Checkbox.Group;
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [subCollectionData, setSubCollectionData] = useState<any>(null);

  // const checkAll = plainOptions.length === checkedList.length;
  // const indeterminate =
  //   checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChangeCheckbox = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    // setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onChange = async (key: any) => {
    if (key.length > 0) {
      const inputDetails = key[0].split('||');
      const subClusterId = inputDetails[0];
      // const hasChild = inputDetails[1];
      // const level = inputDetails[2];
      const clusterName = inputDetails[3];
      const clusterId = inputDetails[4];
      // const entityId = inputDetails[5];
      const subCollectionResponse = await readFromSubCollectionCollections(
        clusterId,
        clusterName,
        subClusterId,
        childrenData.title
      );
      if (subCollectionResponse.ok) {
        setSubCollectionData(subCollectionResponse.data);
      }
    }
  };

  useEffect(() => {
    // console.log('The data in dataComponent', data);
  }, [childrenData, subCollectionData]);

  return (
    <div className="pt-2">
      <Collapse
        size="small"
        style={{ backgroundColor: 'white' }}
        onChange={onChange}
        items={[
          {
            key: `${childrenData.key}`,
            label: `${childrenData.title}`,
            children: <ChildrenComponent childrenData={subCollectionData} />,
          },
        ]}
      />
    </div>
  );
}

export function ChildrenComponent(props: any) {
  useEffect(() => {
    // console.log('The data in childrenData', props.childrenData);
  }, [props]);
  return (
    <>
      {props.childrenData ? (
        props.childrenData.map((item: any) => (
          <div key={item.id}>
            {item.data ? <p>{item.data.title}</p> : <Empty />}
          </div>
        ))
      ) : (
        <Empty />
      )}
    </>
  );
}
