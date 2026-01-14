import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as sendModule from '../send';
import { track } from '../telemetry';
import { setConfig } from '../globals';

describe('track()', () => {
    beforeEach(() => {
        vi.spyOn(sendModule, 'send').mockImplementation(() => {});

        window.Umpteenth = {
            setConfig,
            track,
        };

        window.Umpteenth.setConfig({
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

        expect(payload).toMatchObject({
            t: 'init_ok',
            meta: { partnerId: 'acme' },
            data: { foo: 'bar' },
        });

        expect(typeof payload.ts).toBe('number');
        expect(payload.env).toBeDefined();
    });
});
