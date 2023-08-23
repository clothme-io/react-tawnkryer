/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Separator } from '../../../../components';
import { ProjectCreationForm } from './ProjectCreationForm';
import { useAppStore } from '../../../../store/store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../lib/firebase/firebaseConfig';
import { ProjectResponseItem } from '../../../keyword/model/entityModel';

interface ProjectSelectType {
  value: any;
  label: any;
}

export function ProjectAccountPage() {
  const [projectData, setProjectData] = useState<ProjectSelectType[]>([]);
  const accountId = useAppStore((state) => state.account.id);
  // const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const appendData = () => {
    // setLoading(true);
    const q = query(
      collection(db, 'project'),
      where('account_id', '==', accountId),
    );
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const projects:
        | ProjectResponseItem
        | { value: any; label: any }[] = [];
      querySnapshot.forEach((doc) => {
        // console.log('Values of projects doc.id =====', doc.id);
        // console.log('Values of projects doc.data().name =====', doc.data().name);
        projects.push({ value: doc.id, label: doc.data().name });
      });
      setProjectData(projects);
    });
    return () => unSubscribe();
  };

  useEffect(() => {
    appendData();
  }, []);

  return (
    <div className="space-y-6 px-32">
      <div>
        <h3 className="text-2xl font-medium">Project</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <div className="py-4">
        <div className="pb-8 text-lg font-semibold text-zinc-950">
          Switch Project
        </div>
        <Select
          defaultValue="select a project"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={projectData}
        />
      </div>
      <Separator />
      <ProjectCreationForm />
    </div>
  );
}
