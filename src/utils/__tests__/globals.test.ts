import { describe, it, beforeEach, expect } from 'vitest';
import { setConfig, getConfig } from '../globals';
import type { UmpteenthConfig } from '@/types';

describe('setConfig()', () => {
    beforeEach(() => {
        (window as { Umpteenth: UmpteenthConfig }).Umpteenth = {};
    });

    it('applies defaults when called with no args', () => {
        setConfig();

        const config = getConfig();

        expect(config.errorScope).toBe('script');
        expect(config.scriptMatch).toBeInstanceOf(RegExp);
        expect(config.scriptMatch?.test('https://cdn.umpteenth.0.1.0.js')).toBe(
            true
        );
    });

    it('overrides errorScope when provided', () => {
        setConfig({ errorScope: 'all' });

        const config = getConfig();

        expect(config.errorScope).toBe('all');
    });

    it('accepts a RegExp for scriptMatch', () => {
        const re = /widget\.js/;

        setConfig({ scriptMatch: re });

        const config = getConfig();

        expect(config.scriptMatch).toBe(re);
    });

    it('converts string scriptMatch to RegExp', () => {
        setConfig({ scriptMatch: 'widget\\.js' });

        const { scriptMatch } = window.Umpteenth.config ?? {};

        expect(scriptMatch).toBeInstanceOf(RegExp);
        expect(scriptMatch?.test('https://cdn.widget.js')).toBe(true);
        expect(scriptMatch?.test('https://cdn.other.js')).toBe(false);
    });

    it('allows scriptMatch to be undefined (disables filtering)', () => {
        setConfig({ scriptMatch: undefined });

        const config = getConfig();

        expect(config.scriptMatch).toBeUndefined();
    });

    it('does not mutate the input options object', () => {
        const opts = { errorScope: 'all' as const };

        setConfig(opts);

        expect(opts).toEqual({ errorScope: 'all' });
    });

    it('merges defaults with provided options', () => {
        setConfig({ errorScope: 'stack' });

        const config = getConfig();

        expect(config.errorScope).toBe('stack');
        expect(config.scriptMatch).toBeInstanceOf(RegExp);
    });
});
