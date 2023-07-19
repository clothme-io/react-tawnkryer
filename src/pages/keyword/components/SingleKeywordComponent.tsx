import { SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Button, Input, Label } from '../../../components';

// API function
import { addKeywordData } from '../api/addKeywordAPIs';

interface IFormInput {
  keyword: string;
  kd: string;
  minVolume: string;
  maxVolume: string;
}

export function SingleKeywordComponent() {
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    reset();
    const keywordId = nanoid();
    const date = Date.now() as unknown as string;
    const keywordInput = {
      id: keywordId,
      data: {
        account_id: 'account.id',
        project_id: '',
        type: 'singleKeyword',
        created_at: date,
        details: data,
      },
    };
    const response = await addKeywordData(keywordInput);
    console.log('The resposne from UI ===', response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            type="text"
            placeholder="Enter Keyword"
            {...register('keyword')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="keyword">Max Keyword Difficulty</Label>
          <Input
            type="number"
            defaultValue={30}
            placeholder="Max keyword difficulty"
            {...register('kd')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="keyword">Max Volume Per Keyword</Label>
          <Input
            type="number"
            defaultValue={100}
            placeholder="Max keyword volume"
            {...register('maxVolume')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="keyword">Min Volume Per Keyword</Label>
          <Input
            type="number"
            defaultValue={0}
            placeholder="Min keyword volume"
            {...register('minVolume')}
          />
        </div>
      </div>
      <Button className="mt-6">submit</Button>
    </form>
  );
}
