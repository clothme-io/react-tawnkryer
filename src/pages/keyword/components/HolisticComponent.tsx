import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, Label } from '../../../components';
import { Button } from '../../../components/ui/button';

interface IFormInput {
  entity: string;
}

export function HolisticComponent() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="keyword">Entity</Label>
          <Input
            type="text"
            placeholder="Enter entity you want to rank"
            {...register('entity')}
          />
        </div>
      </div>
      <Button className="mt-6">submit</Button>
    </form>
  );
}
