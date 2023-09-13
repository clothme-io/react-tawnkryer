/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import { Button, Divider, Drawer, Row } from 'antd';
import { useEffect, useState } from 'react';
import { DataNode } from 'antd/es/tree';
import { nanoid } from 'nanoid';
import { ClusterDrawerUI } from './components/ClusterDrawerUI';

// API
import {
  readFromSubCollectionForEntity,
  // readClusterContentsForEntity,
} from './api/readClusterAPIs';
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
    const response = await readFromSubCollectionForEntity(
      accountId,
      projectId,
      entityId
    );
    if (response.ok) setClusterDBData(response.data);
  };

  const updateTreeData = async () => {
    let selectedItem: any = null;
    if (treeData && treeData.length) {
      selectedItem = {
        id: selectedClusterItem.checked[0].id,
        title: selectedClusterItem.checked[0].value.title,
        level: selectedClusterItem.checked[0].value.level,
        has_child: selectedClusterItem.checked[0].value.has_child,
      };
    }

    if (selectedItem && selectedItem.level === '0') {
      const level1_id = nanoid();
      const response = await addClusteriiData(
        selectedItem.level,
        selectedItem.id,
        selectedItem.title,
        projectId,
        accountId,
        entityId,
        false,
        level1_id,
        props.selectedDrawerRecord
      );

      if (response.ok) {
        toggleIsButtonDisabled();
        await getClusterData();
      }
    } else {
      const response = await addClusteriiData(
        selectedItem.level,
        selectedItem.level_0_id,
        selectedItem.level_0_collection_name,
        projectId,
        accountId,
        entityId,
        false,
        selectedItem.id,
        selectedItem.title,
        props.selectedDrawerRecord.keyword
      );

      if (response.ok) {
        toggleIsButtonDisabled();
        await getClusterData();
      }
    }
  };

  const toggleIsButtonDisabled = () => {
    if (isButtonDisabled) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    console.log('Value of the selected row', props.selectedDrawerRecord);
  }, [clusterDBData, isButtonDisabled]);

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
          treeData={treeData}
          setTreeData={setTreeData}
          setSelectedClusterItem={setSelectedClusterItem}
          toggleIsButtonDisabled={toggleIsButtonDisabled}
        />
      </Row>
    </Drawer>
  );
}
