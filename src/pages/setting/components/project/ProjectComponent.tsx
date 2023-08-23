/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Separator } from '../../../../components';
import { ProjectCreationForm } from './ProjectCreationForm';
import { useAppStore } from '../../../../store/store';
import { db } from '../../../../lib/firebase/firebaseConfig';
import { ProjectResponseItem } from '../../../keyword/model/entityModel';
import { useAuth } from '../../../../hooks/useAuth';

// API
import { readProjects } from '../../api/readData';

interface ProjectSelectType {
  value: any;
  label: any;
}

export function ProjectAccountPage() {
  const [projectData, setProjectData] = useState<ProjectSelectType[]>([]);
  const [allProjectData, setAllProjectData] = useState<ProjectSelectType[]>([]);
  const [defaultProjectValue, setDefaultProjectValue] = useState({
    label: '',
    value: '',
  });
  const accountId = useAppStore((state) => state.account.id);
  const { addProjectId } = useAuth();
  // const [loading, setLoading] = useState(false);

  const projectId = JSON.parse(localStorage.getItem("tempProjectId") as string);
  const UserAccount = JSON.parse(localStorage.getItem("tempUserId") as string);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    addProjectId(value);
    setProjectData(allProjectData.filter((item) => item.value !== value));
    allProjectData.forEach((item) => {
      if (item.value === value) {
        setDefaultProjectValue({ label: item.label, value: item.value });
      }
    });
  };

  const getProjectFromDB = async () => {
    const projectResponse = await readProjects(UserAccount);
    if (projectResponse.ok) {
      console.log('The response from project DB ======', projectResponse.data);
      setAllProjectData(projectResponse.data);
      setProjectData(projectResponse.data.filter((item: { value: any; }) => item.value !== projectId));
      projectResponse.data.forEach((item: { value: any; label: any; }) => {
      // console.log('The response from item ======', item);
        if (item.value === projectId) {
          console.log('The response from item ======', item);

          setDefaultProjectValue({ label: item.label, value: item.value});
        }
      })
    }
  }

  const appendData = () => {
    // setLoading(true);
    const q = query(
      collection(db, 'project'),
      where('account_id', '==', accountId)
    );
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const projects: ProjectResponseItem | { value: any; label: any }[] = [];
      querySnapshot.forEach((doc) => {
        projects.push({ value: doc.id, label: doc.data().name });
      });
      setAllProjectData(projects);
      setProjectData(projects.filter((item) => item.value !== projectId));
      projects.forEach((item) => {
        if (item.value === projectId) {
          setDefaultProjectValue({ label: item.label, value: item.value });
        }
      });
    });
    return () => unSubscribe();
  };

  useEffect(() => {
    // appendData();
    getProjectFromDB();
  }, []);

  useEffect(() => {
    console.log('The response from project DB ======', defaultProjectValue);
  }, [defaultProjectValue]);

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
        {/* { defaultProjectName && */}
        {/* <Select
          value={defaultProjectValue.label}
          style={{ width: '100%', color: 'black' }}
          onChange={handleChange}
          options={projectData}
        /> */}
        {/* } */}
      </div>
      <Separator />
      <ProjectCreationForm />
    </div>
  );
}
