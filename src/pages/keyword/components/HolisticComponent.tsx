import { SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Input, Label } from '../../../components';
import { Button } from '../../../components/ui/button';

// API function
import { addKeywordData } from '../api/addKeywordAPIs';

interface IFormInput {
  entity: string;
}

export function HolisticComponent() {
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
        type: 'holisticKeyword',
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
