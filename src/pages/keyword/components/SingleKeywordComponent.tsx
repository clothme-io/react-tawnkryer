import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Input, Label } from '../../../components';

interface IFormInput {
  keyword: string;
  kd: string;
  minVolume: string;
  maxVolume: string;
}

export function SingleKeywordComponent() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="keyword">Keyword</Label>
      <div className="grid gap-6">
        <Input
          type="text"
          placeholder="Enter Keyword"
          {...register('keyword')}
        />
        <Input
          type="number"
          defaultValue={30}
          placeholder="Max keyword difficulty"
          {...register('kd')}
        />
        <Input
          type="number"
          defaultValue={0}
          placeholder="Min keyword volume"
          {...register('minVolume')}
        />
        <Input
          type="number"
          defaultValue={100}
          placeholder="Max keyword volume"
          {...register('maxVolume')}
        />
      </div>

      <Button className="mt-6">submit</Button>
    </form>
  );
}
