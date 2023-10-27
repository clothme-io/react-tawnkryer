/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, REDO_COMMAND, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    };

    return (
        <div className="flex">
            <div className="flex space-x-4">
                <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
                    Undo
                </button>
                <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
                    Redo
                </button>
                {[
                    'Bold',
                    'Italic',
                    'Underline',
                    'Code',
                    'Highlight',
                    'Strikethrough',
                    'Subscript',
                    'Superscript',
                ].map((value) => {
                    return (
                        <button
                            onClick={() =>
                                handleOnClick(value.toLowerCase() as TextFormatType)
                            }
                        >
                            {value}
                        </button>
                    );
                })}

            </div>
        </div>
    );
}
