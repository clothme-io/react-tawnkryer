/* eslint-disable prettier/prettier */
import { EditorState } from 'lexical'
import { useMemo, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import editorTheme from './themes/lexicalTheme'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'
import { prepopulatedRichText } from './initialStateUtil'
import { CustomHeadingPlugin } from './plugins/CustomHeadingPlugin'

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}

interface LexicalEditorProps {
    type: string;
}

const EDITOR_NODES = [
    HeadingNode,
    QuoteNode,
]

export function CustomLexicalEditor({ type }: LexicalEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>();

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={{
                position: 'relative',
                outline: '0px solid transparent',
                maxWidth: '100%',
                padding: '10px'
            }} />
        )
    }, []);

    const CustomPlaceholder = useMemo(() => {
        return (
            <div style={{
                position: 'absolute', top: 30, left: 30,
            }}>
                Enter some text...
            </div>
        )
    }, []);

    const initialConfig = {
        editorState: prepopulatedRichText,
        nodes: EDITOR_NODES,
        namespace: 'type',
        theme: editorTheme,
        onError,
    };

    const onChange = (editorState: EditorState) => {
        setEditorState(editorState);
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <RichTextPlugin
                contentEditable={CustomContent}
                placeholder={CustomPlaceholder}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChange} />
            <HistoryPlugin />
            <CustomHeadingPlugin />
        </LexicalComposer>
    );
}

