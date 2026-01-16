import type { EventData } from '@/types';
import { send } from './send';
import { getConfig } from './globals';

const env = {
    ua: navigator.userAgent,
    p: navigator.userAgentData?.platform || navigator.platform,
    w: screen.width,
    h: screen.height,
    ce: navigator.cookieEnabled,
    dnt: navigator.doNotTrack === '1',
};

function baseContext() {
    return {
        env,
        meta: getConfig()?.meta || {},
    };
}

export function track(type: string, data: EventData = {}) {
    send({
        t: type,
        ts: Date.now(),
        ...baseContext(),
        data,
    });
}

export function captureError(error: Error, data: EventData = {}) {
    track('err', {
        ...data,
        msg: error.message,
        n: error.name,
        s: error.stack,
    });
}
