import type { EventData } from '@/types';
import { send } from './send';
import { getConfig } from './globals';

const env = {
    p: window.location.href,
    ua: navigator.userAgent,
    w: screen.width,
    h: screen.height,
    ce: navigator.cookieEnabled,
    dnt: navigator.doNotTrack === '1',
};

export function capture(type: string, data: EventData = {}) {
    const c = getConfig();

    send(c.url ?? '', {
        t: type,
        ts: Date.now(),
        cid: c?.clientId,
        env,
        meta: c?.meta || {},
        data,
    });
}

export function captureError(error: Error, data: EventData = {}) {
    capture('err', {
        ...data,
        msg: error.message,
        n: error.name,
        s: error.stack,
    });
}
