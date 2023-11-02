/* eslint-disable prettier/prettier */
import { $createHeadingNode } from '@lexical/rich-text';
import { $createParagraphNode, $createTextNode } from 'lexical';

export const headingNode = (root: any, headingElement: any, text: string) => {
    const heading = $createHeadingNode(headingElement);
    heading.append($createTextNode(text));
    root.append(heading);
}

export const paragraphNode = (root: any, text: any) => {
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(text),);
    root.append(paragraph);
}

export const paragraphNodeForCode = (root: any, text: any) => {
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(text).toggleFormat('code'));
    root.append(paragraph);
}
export const paragraphNodeForBold = (root: any, text: any) => {
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(text).toggleFormat('bold'));
    root.append(paragraph);
}
export const paragraphNodeForItalic = (root: any, text: any) => {
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(text).toggleFormat('italic'));
    root.append(paragraph);
}
