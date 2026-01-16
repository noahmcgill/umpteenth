import { describe, it, expect, vi, beforeEach } from 'vitest';
import { send } from '../send';
import { init } from '../globals';
import { captureError, capture } from '../telemetry';

describe('send()', () => {
    beforeEach(() => {
        window.Umpteenth = {
            captureError,
            init,
            capture,
        };

        window.Umpteenth.init({
            url: 'https://example.com',
        });
    });

    it('uses sendBeacon when available', () => {
        const beacon = vi.fn();
        navigator.sendBeacon = beacon as never;

        send({ test: true });

        expect(beacon).toHaveBeenCalledOnce();
    });

    it('falls back to fetch when sendBeacon is missing', () => {
        navigator.sendBeacon = undefined as never;
        globalThis.fetch = vi.fn();

        send({ test: true });

        expect(fetch).toHaveBeenCalledOnce();
    });

    it('does nothing when endpoint is missing', () => {
        window.Umpteenth.init(undefined);

        expect(() => send({ test: true })).not.toThrow();
    });
});
