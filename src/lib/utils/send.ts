import { getConfig } from './globals';

export function send(event: unknown) {
    const endpoint = getConfig()?.url;
    if (!endpoint) return;

    try {
        const payload = JSON.stringify(event);

        if (navigator.sendBeacon) {
            navigator.sendBeacon(endpoint, payload);
        } else {
            fetch(endpoint, {
                method: 'POST',
                body: payload,
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch {
        /* noop */
    }
}
