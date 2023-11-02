/* eslint-disable prettier/prettier */
import type {
    GridSelection,
    LexicalCommand,
    LexicalEditor,
    NodeKey,
    NodeSelection,
    RangeSelection,
} from 'lexical';

import './ImageNode.css';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useCollaborationContext } from '@lexical/react/LexicalCollaborationContext';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';

import {
    $getNodeByKey,
    $getSelection,
    $isNodeSelection,
    $isRangeSelection,
    $setSelection,
    CLICK_COMMAND,
    COMMAND_PRIORITY_LOW,
    createCommand,
    DRAGSTART_COMMAND,
    KEY_BACKSPACE_COMMAND,
    KEY_DELETE_COMMAND,
    KEY_ENTER_COMMAND,
    KEY_ESCAPE_COMMAND,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import * as React from 'react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';