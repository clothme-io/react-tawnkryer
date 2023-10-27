/* eslint-disable prettier/prettier */
import { EditorState } from 'lexical'
import { useMemo, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import editorTheme from './themes/lexicalTheme'
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { MyCustomAutoFocusPlugin } from './plugins/FocusPlugin';

const initData = {
    "root": {
        "children": [
            {
                "children": [
                    {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "asd",
                        "type": "text",
                        "version": 1
                    },
                    {
                        "type": "linebreak",
                        "version": 1
                    },
                    {
                        "detail": 0,
                        "format": 0,
                        "mode": "normal",
                        "style": "",
                        "text": "dsa",
                        "type": "text",
                        "version": 1
                    }
                ],
                "direction": "ltr",
                "format": "",
                "indent": 0,
                "type": "paragraph",
                "version": 1
            }
        ],
        "direction": "ltr",
        "format": "",
        "indent": 0,
        "type": "root",
        "version": 1
    }
}


// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
    console.error(error);
}

interface LexicalEditorProps {
    type: string;
}

export function CustomLexicalEditor({ type }: LexicalEditorProps) {
    const [editorState, setEditorState] = useState<EditorState>();

    const CustomContent = useMemo(() => {
        return (
            <ContentEditable style={{
                position: 'relative',
                // borderColor: 'rgba(255,211,2,0.68)',
                border: '2px solid white',
                // borderRadius: '5px',
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
        editorState: JSON.stringify(initData),
        namespace: type,
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
            {/* <MyCustomAutoFocusPlugin /> */}
        </LexicalComposer>
    );
}

