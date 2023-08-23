/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Separator } from '../../../../components';
import { ProjectCreationForm } from './ProjectCreationForm';
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
  const { addProjectId } = useAuth();
  // const [loading, setLoading] = useState(false);

  const projectId = JSON.parse(localStorage.getItem('tempProjectId') as string);
  const UserAccount = JSON.parse(localStorage.getItem('tempUserId') as string);

  const handleChange = (value: string) => {
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
      const projects = convertToSelectData(projectResponse.data);
      setAllProjectData(projects);
      setProjectData(projects.filter((item) => item.value !== projectId));
      projects.forEach((item: { value: any; label: any }) => {
        if (item.value === projectId) {
          setDefaultProjectValue({ label: item.label, value: item.value });
        }
      });
    }
  };

  const convertToSelectData = (data: any) => {
    const items = [];
    for (let x = 0; x < data.length; x++) {
      const item = {
        value: data[x].id,
        label: data[x].value.name,
        default: data[x].value.default,
      };
      items.push(item);
    }
    return items;
  };

  useEffect(() => {
    getProjectFromDB();
  }, []);

  useEffect(() => {}, [defaultProjectValue]);

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
          value={defaultProjectValue.label}
          style={{ width: '100%', color: 'black' }}
          onChange={handleChange}
          options={projectData}
        />
      </div>
      <Separator />
      <ProjectCreationForm />
    </div>
  );
}
