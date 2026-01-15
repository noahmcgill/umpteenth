import type { EventData } from '@/types';
import { send } from './send';
import { getConfig } from './globals';

const env = {
    ua: navigator.userAgent,
    lang: navigator.language,
    platform: navigator.userAgentData?.platform || navigator.platform,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
