/* eslint-disable prettier/prettier */
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text'

export function prepopulatedRichText() {
    const root = $getRoot();
    if (root.getFirstChild() === null) {
        const heading = $createHeadingNode('h1');
        heading.append($createTextNode('Welcome to the playground'));
        root.append(heading);

        const paragraph = $createParagraphNode();
        paragraph.append(
            $createTextNode('The playground is a demo environment built with '),
            $createTextNode('@lexical/react').toggleFormat('code'),
            $createTextNode('.'),
            $createTextNode(' Try typing in '),
            $createTextNode('some text').toggleFormat('bold'),
            $createTextNode(' with '),
            $createTextNode('different').toggleFormat('italic'),
            $createTextNode(' formats.')
        );
        root.append(paragraph);
        const paragraph2 = $createParagraphNode();
        paragraph2.append(
            $createTextNode(
                'Make sure to check out the various plugins in the toolbar. You can also use #hashtags or @-mentions too!'
            )
        );
        root.append(paragraph2);
        const paragraph3 = $createParagraphNode();
        paragraph3.append(
            $createTextNode(`If you'd like to find out more about Lexical, you can:`)
        );
        root.append(paragraph3);
        const paragraph4 = $createParagraphNode();
        paragraph4.append(
            $createTextNode(
                `Lastly, we're constantly adding cool new features to this playground. So make sure you check back here when you next get a chance :).`
            )
        );
        root.append(paragraph4);
    }
}
