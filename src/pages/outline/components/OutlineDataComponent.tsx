import PlaygroundApp from '../../../components/ui/lexical/App';
import { CustomLexicalEditor } from '../../../components/ui/customEditor/lexicalEditor';

interface OutlineDataProps {
  content: string;
}

export function OutlineDataComponent({ content }: OutlineDataProps) {
  return (
    <div className="pt-8 px-4" style={{ height: '100vh' }}>
      <CustomLexicalEditor type={content} />
    </div>
  );
}
