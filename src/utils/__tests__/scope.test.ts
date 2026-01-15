import { describe, it, beforeEach, expect } from 'vitest';
import { shouldCaptureError } from '../scope';
import { setConfig } from '../globals';

describe('shouldCaptureError()', () => {
    beforeEach(() => {
        window.Umpteenth = {
            setConfig,
            track: () => {
                /* noop */
            },
        };
        window.Umpteenth.setConfig({
            errorScope: 'script',
            scriptMatch: /umpteenth(\.\d+)*\.js/,
        });
    });

    it('returns true when errorScope is "all"', () => {
        setConfig({ errorScope: 'all' });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'anything.js',
        });

        expect(shouldCaptureError(event)).toBe(true);
    });

    it('returns true when scriptMatch is undefined', () => {
        setConfig({ scriptMatch: undefined });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'random.js',
        });

        expect(shouldCaptureError(event)).toBe(true);
    });

    it('returns true if stack matches scriptMatch in stack mode', () => {
        setConfig({ errorScope: 'stack', scriptMatch: /mywidget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'other.js',
            error: {
                stack: 'TypeError: fail at https://cdn.mywidget.js',
            } as Error,
        });

        expect(shouldCaptureError(event)).toBe(true);
    });

    it('returns false if stack does not match in stack mode', () => {
        setConfig({ errorScope: 'stack', scriptMatch: /mywidget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'other.js',
            error: {
                stack: 'TypeError: fail at https://cdn.other.js',
            } as Error,
        });

        expect(shouldCaptureError(event)).toBe(false);
    });

    it('returns true if filename matches in script mode', () => {
        setConfig({ errorScope: 'script', scriptMatch: /widget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'https://cdn.widget.js',
        });

        expect(shouldCaptureError(event)).toBe(true);
    });

    it('returns false if filename does not match in script mode', () => {
        setConfig({ errorScope: 'script', scriptMatch: /widget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'https://cdn.other.js',
        });

        expect(shouldCaptureError(event)).toBe(false);
    });

    it('returns false if neither stack nor filename match', () => {
        setConfig({ errorScope: 'stack', scriptMatch: /widget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'https://cdn.other.js',
            error: {
                stack: 'TypeError: fail at https://cdn.other.js',
            } as Error,
        });

        expect(shouldCaptureError(event)).toBe(false);
    });

    it('returns true if stack exists but errorScope is script and filename matches', () => {
        setConfig({ errorScope: 'script', scriptMatch: /widget\.js/ });

        const event = new ErrorEvent('error', {
            message: 'fail',
            filename: 'https://cdn.widget.js',
            error: {
                stack: 'TypeError: fail at https://cdn.other.js',
            } as Error,
        });

        expect(shouldCaptureError(event)).toBe(true);
    });
});
