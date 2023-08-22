import { Select } from 'antd';
import { Separator } from '../../../../components';
import { ProjectCreationForm } from './ProjectCreationForm';

export function ProjectAccountPage() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="space-y-6 px-32">
      <div>
        <h3 className="text-lg font-medium">Project</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <div className="py-4">
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
