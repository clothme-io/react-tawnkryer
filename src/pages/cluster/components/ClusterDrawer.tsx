/* eslint-disable react/destructuring-assignment */
import { Divider, Drawer, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ClusterPage } from '../ClusterPage';

// API
import { readClusterContents } from '../api/readClusterAPIs';

interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

function DescriptionItem({ title, content }: DescriptionItemProps) {
  return (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );
}

export function ClusterDrawer(props: any) {

  const [clusterDBData, setClusterDBData] = useState(null);

  const accountId = JSON.parse(localStorage.getItem('tempUserId') as string);
  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);

  const getClusterData = async () => {
    const response = await readClusterContents(accountId, projectId);
    console.log('the response in cluster drawer', response);
  }

  useEffect(() => {
    getClusterData()
  }, [props.selectedDrawerRecord]);

  return (
    <Drawer
      width={340}
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.open}
    >
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        User Profile
      </p>
      <Row>
        <ClusterPage />
      </Row>
      <Divider />
    </Drawer>
  );
}
