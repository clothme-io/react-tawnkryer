import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Input, Label } from '../../../components';
import { Button } from '../../../components/ui/button';

// API Functions
import { addKeywordData } from '../api/addKeywordAPIs';

interface IFormInput {
  url: string;
  niche: string;
}

export function KeywordGapAnalysisComponent() {
  const { control, reset, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      url: '',
      niche: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    reset();
    const newId = nanoid();
    const date = Date.now() as unknown as string;
    const keywordInput = {
      id: newId,
      data: {
        type: 'keywordGapAnalysis',
        account_id: '',
        project_id: '',
        created_at: date,
        details: {
          niche: data.niche,
          url: data.url,
        },
      },
    };
    const response = await addKeywordData(keywordInput);
    console.log('The response data ====', response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="keyword">Website URL</Label>
          <Controller
            name="url"
            control={control}
            render={({ field }) => <Input placeholder="Enter url" {...field} />}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="keyword">Niche Or Industry</Label>
          <Controller
            name="niche"
            control={control}
            render={({ field }) => (
              <Input placeholder="Enter niche" {...field} />
            )}
          />
        </div>
      </div>
      <Button className="mt-6">submit</Button>
    </form>
  );
}
