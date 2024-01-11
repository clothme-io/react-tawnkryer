/* eslint-disable react/button-has-type */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { UNDO_COMMAND, REDO_COMMAND, FORMAT_TEXT_COMMAND, TextFormatType } from 'lexical';
import { HeadingTagType } from "@lexical/rich-text";
import { FORMAT_HEADING_COMMAND } from "./CustomHeadingPlugin"

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();

    const handleOnClick = (formatType: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
    };

    const handleHeadingClick = (tag: HeadingTagType) => {
        editor.dispatchCommand(FORMAT_HEADING_COMMAND, tag);
    };

    return (
        <div className="flex">
            <div className="flex space-x-1">
                <button
                    className="bg-slate-400 p-2"
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                >
                    Undo
                </button>
                <button
                    className="bg-slate-400 p-2"
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                >
                    Redo
                </button>
                {(['h1', 'h2', 'h3', 'h4', 'h5'] as Array<HeadingTagType>).map(
                    (tag) => {
                        return (
                            <button key={tag} onClick={() => handleHeadingClick(tag)}>
                                {tag}
                            </button>
                        );
                    }
                )}
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
                            className="bg-slate-400 p-2"
                        >
                            {value}
                        </button>
                    );
                })}

            </div>
        </div>
    );
}
