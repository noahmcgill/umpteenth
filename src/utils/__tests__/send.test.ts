import { describe, it, expect, vi, beforeEach } from 'vitest';
import { send } from '../send';

describe('send()', () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    it('does not call fetch when sendBeacon returns true', () => {
        const beacon = vi.fn(() => true);
        navigator.sendBeacon = beacon as never;

        send('https://example.com', { test: true });

        expect(beacon).toHaveBeenCalledOnce();
        expect(fetch).not.toHaveBeenCalled();
    });

    it('falls back to fetch when sendBeacon returns false', () => {
        const beacon = vi.fn(() => false);
        navigator.sendBeacon = beacon as never;

        send('https://example.com', { test: true });

        expect(beacon).toHaveBeenCalledOnce();
        expect(fetch).toHaveBeenCalledOnce();
    });
});
