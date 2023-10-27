/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
import { UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function CustomHistoryActions() {
    const [editor] = useLexicalComposerContext();
    return (
        <div className="flex justify-between">
            <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                Undo
            </button>
            <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
                Redo
            </button>
        </div>
    );
}
