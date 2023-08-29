/* eslint-disable react/destructuring-assignment */
import { Divider, Drawer, Row } from 'antd';
import { useEffect } from 'react';
import { ClusterPage } from '../ClusterPage';

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
  useEffect(() => {
    // console.log('The object record', props.selectedDrawerRecord.name);
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
