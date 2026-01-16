import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as sendModule from '../send';
import { capture, captureError } from '../telemetry';
import { init } from '../globals';

describe('capture()', () => {
    beforeEach(() => {
        vi.spyOn(sendModule, 'send').mockImplementation(() => {});

        window.Umpteenth = {
            captureError,
            init,
            capture,
        };

        window.Umpteenth.init({
            clientId: 'test-client-id',
            url: 'https://example.com',
            meta: { partnerId: 'acme' },
        });
    });

    it('sends correct base payload', () => {
        const spy = vi.spyOn(sendModule, 'send').mockImplementation(() => {});

        capture('init_ok', { foo: 'bar' });

        expect(spy).toHaveBeenCalledOnce();

        const payload = spy.mock.calls[0][0] as {
            t: string;
            ts: number;
            cid: string;
            env: unknown;
            meta: unknown;
            data: unknown;
        };

        expect(payload).toEqual(
            expect.objectContaining({
                t: 'init_ok',
                cid: 'test-client-id',
                meta: { partnerId: 'acme' },
                data: { foo: 'bar' },
            })
        );

        expect(typeof payload.ts).toBe('number');
        expect(payload.env).toBeDefined();
    });
});
