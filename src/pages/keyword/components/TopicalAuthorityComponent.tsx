import { SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Input, Label } from '../../../components';
import { Button } from '../../../components/ui/button';

// API function
import { addKeywordData } from '../api/addKeywordAPIs';

interface IFormInput {
  keyword: string;
}

export function TopicalAuthorityComponent() {
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
        type: 'topicalAuthorityKeyword',
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
            placeholder="Enter main keyword"
            {...register('keyword')}
          />
        </div>
      </div>
      <Button className="mt-6">submit</Button>
    </form>
  );
}
