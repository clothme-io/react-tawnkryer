import { SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Input, Label, Textarea } from '../../../components';
import { Button } from '../../../components/ui/button';

// API functions
import { addMultiKeywordData } from '../api/addKeywordAPIs';

interface IFormInput {
  keywords: string;
  kd: string;
  minVolume: string;
  maxVolume: string;
}

export function MultiKeywordComponent() {
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    reset();
    const keywordId = nanoid();
    const date = Date.now() as unknown as string;
    const keywordInput = {
      id: keywordId,
      data: {
        account_id: '',
        project_id: '',
        type: 'multiKeyword',
        created_at: date,
        keywords: data,
      },
    };
    const response = await addMultiKeywordData(keywordInput);
    console.log('The resposne from UI ===', response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="keyword">Keyword</Label>
          <Textarea placeholder="Enter Keywords" {...register('keywords')} />
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
