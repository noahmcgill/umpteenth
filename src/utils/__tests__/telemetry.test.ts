import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as sendModule from '../send';
import { track, captureError } from '../telemetry';
import { init } from '../globals';

describe('track()', () => {
    beforeEach(() => {
        vi.spyOn(sendModule, 'send').mockImplementation(() => {});

        window.Umpteenth = {
            captureError,
            init,
            track,
        };

        window.Umpteenth.init({
            url: 'https://example.com',
            meta: { partnerId: 'acme' },
        });
    });

    it('sends correct base payload', () => {
        const spy = vi.spyOn(sendModule, 'send').mockImplementation(() => {});

        track('init_ok', { foo: 'bar' });

        expect(spy).toHaveBeenCalledOnce();

        const payload = spy.mock.calls[0][0] as {
            t: string;
            ts: number;
            env: unknown;
            meta: unknown;
            data: unknown;
        };

        expect(payload).toEqual(
            expect.objectContaining({
                t: 'init_ok',
                meta: { partnerId: 'acme' },
                data: { foo: 'bar' },
            })
        );

        expect(typeof payload.ts).toBe('number');
        expect(payload.env).toBeDefined();
    });
});
