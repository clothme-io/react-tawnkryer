/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Separator } from '../../../../components';
import { ProjectCreationForm } from './ProjectCreationForm';
import { useAppStore } from '../../../../store/store';

interface ProjectSelectType {
  value: string;
  label: string;
}

export function ProjectAccountPage() {
  const [projectData, setProjectData] = useState<ProjectSelectType[]>([]);
  const projects = useAppStore((state) => state.projects);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const formatProjectData = () => {
    console.log('The data for projects in settings***********', projects);
    const items: ProjectSelectType[] = [];
    const item: ProjectSelectType = { value: '', label: '' };
    for (let i = 0; i < projects.length; i++) {
      item.value = projects[i].id;
      item.label = projects[i].project.name;
      items.push(item);
    }
    setProjectData(items);
  };

  useEffect(() => {
    formatProjectData();
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
          defaultValue="lucy"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
        />
      </div>
      <Separator />
      <ProjectCreationForm />
    </div>
  );
}
