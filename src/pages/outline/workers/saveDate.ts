/* eslint-disable no-restricted-globals */

import { addOutlineToArticle } from '../api/addOutlineAPIs';

/* eslint-disable prettier/prettier */
self.onmessage = async (e: MessageEvent<string>) => {
    const data = JSON.parse(e.data) as any;

    if (data.action) {
        return;
    }
    if (data.period === "initial") {
        // const items = profiles.filter((item, index) => index < listPageSize);
        const response = await addOutlineToArticle('', '', '')

        self.postMessage(JSON.stringify(response));
    }
};

export { };
