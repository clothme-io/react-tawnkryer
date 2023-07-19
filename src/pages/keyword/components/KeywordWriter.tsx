import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { onSnapshot, collection, query, where } from 'firebase/firestore';

import { db } from '../../../lib/firebase/firebaseConfig';

export function EditorComponent() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const [keywordData, setKeywordData] = React.useState<any>();
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  React.useEffect(() => {
    const q = query(
      collection(db, 'keyword'),
      where('account_id', '==', 'accountid'),
      where('project_id', '==', '1234')
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setKeywordData(doc.data());
        // setKeywordData((prev: any) => [...prev, doc.data()]);
      });
    });
  }, []);

  React.useEffect(() => {
    // console.log('the datat =====', keywordData);
  }, [keywordData]);

  return (
    <div className="max-w-full">
      {/* <div>{keywordData ? keywordData.details.entity : ''}</div> */}
      <Editor
        editorState={editorState}
        wrapperClassName="max-w-full"
        editorClassName="max-w-full"
        handleKeyCommand={handleKeyCommand}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
            'embedded',
            'emoji',
            'image',
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'monospace',
              'superscript',
              'subscript',
            ],
            // bold: { icon: bold, className: undefined },
            // italic: { icon: italic, className: undefined },
            // underline: { icon: underline, className: undefined },
            // strikethrough: { icon: strikethrough, className: undefined },
            // monospace: { icon: monospace, className: undefined },
            // superscript: { icon: superscript, className: undefined },
            // subscript: { icon: subscript, className: undefined },
          },
          blockType: {
            inDropdown: true,
            options: [
              'Normal',
              'H1',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
              'Blockquote',
              'Code',
            ],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          fontSize: {
            icon: 'Fonsize',
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          emoji: {
            icon: 'emoji',
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            emojis: [
              '😀',
              '😁',
              '😂',
              '😃',
              '😉',
              '😋',
              '😎',
              '😍',
              '😗',
              '🤗',
              '🤔',
              '😣',
              '😫',
              '😴',
              '😌',
              '🤓',
              '😛',
              '😜',
              '😠',
              '😇',
              '😷',
              '😈',
              '👻',
              '😺',
              '😸',
              '😹',
              '😻',
              '😼',
              '😽',
              '🙀',
              '🙈',
              '🙉',
              '🙊',
              '👼',
              '👮',
              '🕵',
              '💂',
              '👳',
              '🎅',
              '👸',
              '👰',
              '👲',
              '🙍',
              '🙇',
              '🚶',
              '🏃',
              '💃',
              '⛷',
              '🏂',
              '🏌',
              '🏄',
              '🚣',
              '🏊',
              '⛹',
              '🏋',
              '🚴',
              '👫',
              '💪',
              '👈',
              '👉',
              '👉',
              '👆',
              '🖕',
              '👇',
              '🖖',
              '🤘',
              '🖐',
              '👌',
              '👍',
              '👎',
              '✊',
              '👊',
              '👏',
              '🙌',
              '🙏',
              '🐵',
              '🐶',
              '🐇',
              '🐥',
              '🐸',
              '🐌',
              '🐛',
              '🐜',
              '🐝',
              '🍉',
              '🍄',
              '🍔',
              '🍤',
              '🍨',
              '🍪',
              '🎂',
              '🍰',
              '🍾',
              '🍷',
              '🍸',
              '🍺',
              '🌍',
              '🚑',
              '⏰',
              '🌙',
              '🌝',
              '🌞',
              '⭐',
              '🌟',
              '🌠',
              '🌨',
              '🌩',
              '⛄',
              '🔥',
              '🎄',
              '🎈',
              '🎉',
              '🎊',
              '🎁',
              '🎗',
              '🏀',
              '🏈',
              '🎲',
              '🔇',
              '🔈',
              '📣',
              '🔔',
              '🎵',
              '🎷',
              '💰',
              '🖊',
              '📅',
              '✅',
              '❎',
              '💯',
            ],
          },
        }}
      />
    </div>
  );
}
