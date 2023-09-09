/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import { Button, Divider, Drawer, Row } from 'antd';
import { useEffect, useState } from 'react';
import { DataNode } from 'antd/es/tree';
import { ClusterDrawerUI } from './components/ClusterDrawerUI';

// API
import { readClusterContentsForEntity } from './api/readClusterAPIs';
import { addClusteriiData } from './api/addClusterAPIs';

export function ClusterDrawerPage(props: any) {
  const [clusterDBData, setClusterDBData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedClusterItem, setSelectedClusterItem] = useState<any>([]);
  const [treeData, setTreeData] = useState<DataNode[]>();

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const entityId = JSON.parse(localStorage.getItem('tempEntityId') as string);

  const getClusterData = async () => {
    const response = await readClusterContentsForEntity(
      accountId,
      projectId,
      entityId
    );

    console.log('Value of getClusterData 2', response);

    if (response.ok) setClusterDBData(response.data);
  };

  const updateTreeData = async () => {
    console.log('Value of info', selectedClusterItem);
    console.log('Value of treeData', treeData);
    console.log(
      'Value of selectedRecord.keyword',
      props.selectedDrawerRecord.keyword
    );
    if (treeData && treeData.length) {
      console.log('Value of treeData', treeData[0].key);

      const response = await addClusteriiData(
        treeData[0].key as string,
        treeData[0].title as string,
        props.selectedDrawerRecord.keyword
      );

      if (response.ok) {
        await getClusterData();
      }
      console.log('Value of response', response);
    }
  };

  useEffect(() => {}, [clusterDBData, isButtonDisabled]);

  useEffect(() => {
    getClusterData();
  }, [props.selectedDrawerRecord]);

  return (
    <Drawer
      width={500}
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.open}
    >
      <div className="flex">
        <div className="flex-1">
          <p
            className="site-description-item-profile-p"
            style={{ marginBottom: 24 }}
          >
            Entity Cluster
          </p>
        </div>
        <div className="justify-end">
          <Button
            type="default"
            size="middle"
            disabled={isButtonDisabled}
            onClick={updateTreeData}
            className="bg-black text-white hover:text-white"
          >
            Include In A Cluster
          </Button>
        </div>
      </div>
      <Divider />
      <Row>
        <ClusterDrawerUI
          UIData={clusterDBData}
          // selectedRecord={props.selectedDrawerRecord}
          isButtonDisabled={isButtonDisabled}
          setIsButtonDisabled={setIsButtonDisabled}
          treeData={treeData}
          setTreeData={setTreeData}
          setSelectedClusterItem={setSelectedClusterItem}
        />
      </Row>
    </Drawer>
  );
}
