import { } from './addClusterAPIs';

self.onmessage = (e: MessageEvent<any>) => {
    if (e.data === '') {

        self.postMessage('');
    }
}

export {};