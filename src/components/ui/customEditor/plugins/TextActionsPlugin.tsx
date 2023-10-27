/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';

export function TextActionsPlugin() {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <span style={{ fontWeight: 'bold' }}>Text actions</span>
            <div>
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
