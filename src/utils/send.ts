export function send(url: string, event: unknown) {
    try {
        const payload = JSON.stringify(event);
        const sent = navigator.sendBeacon(url, payload);

        if (!sent) {
            fetch(url, {
                method: 'POST',
                body: payload,
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
            }).catch(() => {});
        }
    } catch {
        /* noop */
    }
}
