/* eslint-disable prettier/prettier */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export function OnChangePlugin() {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerUpdateListener((listener) => {
            console.log('DATA', listener.editorState.toJSON());
        });
    }, [editor]);

    return null;
}
